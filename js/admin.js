// ============================================================
// ADMIN.JS — Management Portal Logic
// Handles News CRUD and Analytics
// ============================================================

// Password is stored as SHA-256 hash — never in plain text
// Hash of: webzone2026
const ADMIN_HASH = '2c252a6baa9d3a00670b1eccb98a913f57e817620dcf31dddbb453455a8020b3';

async function sha256(str) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('wz_admin_auth') === 'true') {
        showPanel();
    }
    // Allow Enter key to submit
    document.getElementById('adminPass')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') checkLogin();
    });
});

async function checkLogin() {
    const input = document.getElementById('adminPass').value.trim();
    const errorEl = document.getElementById('loginError');
    const btn = document.getElementById('loginBtn');

    if (!input) return;

    // Show loading state
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying...';

    const inputHash = await sha256(input);

    if (inputHash === ADMIN_HASH) {
        sessionStorage.setItem('wz_admin_auth', 'true');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Access Granted';
        setTimeout(showPanel, 400);
    } else {
        errorEl.style.display = 'flex';
        btn.disabled = false;
        btn.innerHTML = 'Login to Dashboard';
        // Shake the card
        document.querySelector('.admin-login-card').classList.add('shake');
        setTimeout(() => document.querySelector('.admin-login-card').classList.remove('shake'), 500);
    }
}

function logout() {
    sessionStorage.removeItem('wz_admin_auth');
    location.reload();
}

function showPanel() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    renderNewsTable();
}

function switchTab(tab) {
    document.querySelectorAll('.admin-tab-btn').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none');

    if (tab === 'news') {
        document.getElementById('newsTab').style.display = 'block';
        document.getElementById('tabBtnNews').classList.add('active');
        renderNewsTable();
    } else if (tab === 'stats') {
        document.getElementById('statsTab').style.display = 'block';
        document.getElementById('tabBtnStats').classList.add('active');
        renderStats();
    }
}

// ============================================================
//  NEWS MANAGEMENT
// ============================================================

async function getNewsList() {
    if (window.fb_getNewsList) {
        return await window.fb_getNewsList();
    }
    const saved = localStorage.getItem('wz_news_list');
    return saved ? JSON.parse(saved) : [];
}

async function renderNewsTable() {
    const news = await getNewsList();
    const tbody = document.getElementById('newsTableBody');

    if (news.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:40px; color:#64748b;">No news posts yet. Click "Add New Post" to start.</td></tr>`;
        return;
    }

    tbody.innerHTML = news.map((item, idx) => `
        <tr>
            <td>
                ${item.img ? `<img src="${item.img}" class="news-thumb" onerror="this.src='https://placehold.co/40x40?text=Post'">` : '—'}
            </td>
            <td><strong>${item.title}</strong></td>
            <td>${item.date}</td>
            <td>
                <div class="news-actions">
                    <button class="btn-admin" style="background:#f1f5f9;" onclick="editNews('${item.id || idx}', ${idx})">Edit</button>
                    <button class="btn-admin btn-danger" onclick="deleteNews('${item.id || idx}', ${idx})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function showAddNewsModal() {
    document.getElementById('modalTitle').innerText = 'Add News Post';
    document.getElementById('editIdx').value = '-1';
    document.getElementById('editDbId').value = '';
    resetModal();
    document.getElementById('newsModal').style.display = 'flex';
}

function closeNewsModal() {
    document.getElementById('newsModal').style.display = 'none';
}

function resetModal() {
    document.getElementById('news_title_in').value = '';
    document.getElementById('news_date_in').value = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('news_img_in').value = '';
    document.getElementById('news_desc_in').value = '';
    document.getElementById('news_link_in').value = '';
    document.getElementById('imgPreview').style.display = 'none';
    document.getElementById('previewEl').src = '';
}

function handleImageUpload(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const rawUrl = e.target.result;
        compressImage(rawUrl, (compressed) => {
            document.getElementById('news_img_in').value = compressed; // Set base64 to hidden-ish input
            const preview = document.getElementById('imgPreview');
            const previewImg = document.getElementById('previewEl');
            previewImg.src = compressed;
            preview.style.display = 'block';
        });
    };
    reader.readAsDataURL(file);
}

function compressImage(src, callback) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const max = 600; // Resize to max 600px

        if (width > height) {
            if (width > max) { height *= max / width; width = max; }
        } else {
            if (height > max) { width *= max / height; height = max; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.7)); // 70% quality jpeg
    };
}

async function saveNews() {
    try {
        const title = document.getElementById('news_title_in').value;
        const date = document.getElementById('news_date_in').value;
        const img = document.getElementById('news_img_in').value;
        const desc = document.getElementById('news_desc_in').value;
        const link = document.getElementById('news_link_in').value;
        
        const idxElem = document.getElementById('editIdx');
        const dbIdElem = document.getElementById('editDbId');
        
        const idx = idxElem ? parseInt(idxElem.value) : -1;
        const dbId = dbIdElem ? dbIdElem.value : '';

        if (!title || !desc) return alert('Title and Description are required.');

        const newItem = { title, date, img, desc, link };
        
        // Show saving status safely
        const titleElem = document.getElementById('modalTitle');
        if (titleElem) titleElem.innerText = "Saving to Database...";

        // Create a safety timeout
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Network timeout! Your Ad-Blocker/Firewall may be blocking Firebase, or the connection is too slow. The post might still save in the background once connected.")), 8000)
        );

        if (idx === -1 || isNaN(idx)) {
            if (window.fb_addNews) {
                await Promise.race([window.fb_addNews(newItem), timeoutPromise]);
            }
        } else {
            if (window.fb_updateNews) {
                await Promise.race([window.fb_updateNews(dbId || String(idx), newItem, idx), timeoutPromise]);
            }
        }

        closeNewsModal();
        renderNewsTable();
    } catch (error) {
        console.error("Save Post Error:", error);
        alert("An error occurred while saving: " + error.message);
        closeNewsModal();
    }
}

async function editNews(id, idx) {
    try {
        const list = await getNewsList();
        const item = list[idx];
        if (!item) return;

        document.getElementById('modalTitle').innerText = 'Edit News Post';
        if (document.getElementById('editIdx')) document.getElementById('editIdx').value = idx;
        if (document.getElementById('editDbId')) document.getElementById('editDbId').value = id;

        document.getElementById('news_title_in').value = item.title;
        document.getElementById('news_date_in').value = item.date;
        document.getElementById('news_img_in').value = item.img || '';
        document.getElementById('news_desc_in').value = item.desc;
        document.getElementById('news_link_in').value = item.link || '';

        const preview = document.getElementById('imgPreview');
        if (item.img && preview) {
            document.getElementById('previewEl').src = item.img;
            preview.style.display = 'block';
        } else if (preview) {
            preview.style.display = 'none';
        }

        document.getElementById('newsModal').style.display = 'flex';
    } catch(e) {
        console.error("Error opening edit modal:", e);
    }
}

async function deleteNews(id, idx) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
        if (window.fb_deleteNews) await window.fb_deleteNews(String(id), idx);
        renderNewsTable();
    } catch(e) {
        console.error("Delete Error", e);
        alert("Failed to delete post: " + e.message);
    }
}

// ============================================================
//  RICH TEXT UTILS
// ============================================================

function wrapText(tag) {
    const area = document.getElementById('news_desc_in');
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const text = area.value;
    const selected = text.substring(start, end);

    if (tag === 'br') {
        area.value = text.substring(0, start) + '<br>' + text.substring(end);
    } else {
        area.value = text.substring(0, start) + '<' + tag + '>' + selected + '</' + tag + '>' + text.substring(end);
    }
    area.focus();
}

function wrapColor(color) {
    const area = document.getElementById('news_desc_in');
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const text = area.value;
    const selected = text.substring(start, end);

    area.value = text.substring(0, start) + '<span style="color:' + color + ';">' + selected + '</span>' + text.substring(end);
    area.focus();
}

function wrapBg(color) {
    const area = document.getElementById('news_desc_in');
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const text = area.value;
    const selected = text.substring(start, end);

    area.value = text.substring(0, start) + '<span style="background-color:' + color + ';">' + selected + '</span>' + text.substring(end);
    area.focus();
}

function wrapStyle(style) {
    const area = document.getElementById('news_desc_in');
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const text = area.value;
    const selected = text.substring(start, end);

    area.value = text.substring(0, start) + '<div style="' + style + '">' + selected + '</div>' + text.substring(end);
    area.focus();
}

function wrapList() {
    const area = document.getElementById('news_desc_in');
    const start = area.selectionStart;
    const end = area.selectionEnd;
    const text = area.value;
    const selected = text.substring(start, end);

    area.value = text.substring(0, start) + '• ' + selected + text.substring(end);
    area.focus();
}

// ============================================================
//  ANALYTICS DASHBOARD
// ============================================================

function renderStats() {
    const stats = JSON.parse(localStorage.getItem('wz_stats') || '{"views":0, "clicks":0, "services":{}, "langs":{}}');

    // Top Cards
    document.getElementById('stat_views').innerText = stats.views.toLocaleString();
    document.getElementById('stat_clicks').innerText = stats.clicks.toLocaleString();
    const rate = stats.views > 0 ? ((stats.clicks / stats.views) * 100).toFixed(1) : 0;
    document.getElementById('stat_rate').innerText = rate + '%';

    // Services
    const srvBox = document.getElementById('servicesDistribution');
    const sortedSrv = Object.entries(stats.services).sort((a, b) => b[1] - a[1]);
    if (sortedSrv.length === 0) {
        srvBox.innerHTML = '<p style="color:#64748b; padding:20px; text-align:center;">No service clicks tracked yet.</p>';
    } else {
        srvBox.innerHTML = sortedSrv.slice(0, 10).map(([name, count]) => {
            const pct = Math.min((count / stats.clicks) * 100, 100);
            return `
                <div style="margin-bottom:16px;">
                    <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:4px;">
                        <strong>${name}</strong>
                        <span style="color:var(--admin-primary); font-weight:600;">${count} clicks</span>
                    </div>
                    <div style="height:10px; width:100%; background:#f1f5f9; border-radius:10px; overflow:hidden;">
                        <div style="height:100%; width:${pct}%; background:linear-gradient(90deg, #2563eb, #3b82f6); border-radius:10px;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Languages
    const langBox = document.getElementById('langDistribution');
    const sortedLang = Object.entries(stats.langs).sort((a, b) => b[1] - a[1]);
    if (sortedLang.length === 0) {
        langBox.innerHTML = '<p style="color:#64748b; padding:20px; text-align:center;">No language data.</p>';
    } else {
        langBox.innerHTML = sortedLang.map(([code, count]) => {
            const labels = { en: '🇬🇧 English', ml: '🇮🇳 Malayalam', hi: '🇮🇳 Hindi' };
            return `
                <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #f1f5f9;">
                    <span>${labels[code] || code}</span>
                    <strong style="color:#1e293b;">${count}</strong>
                </div>
            `;
        }).join('');
    }
}

function resetStats() {
    if (!confirm('Are you sure you want to reset all analytics data? This cannot be undone.')) return;
    localStorage.removeItem('wz_stats');
    renderStats();
}
