import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// ==========================================
// 🚀 SUPABASE CLOUD DATABASE SETUP
// ==========================================
// Replace this URL with your project URL from Settings -> API
const SUPABASE_URL = 'https://qchcghoifdioshvtwoug.supabase.co'; // e.g. https://xyzxyzxyzxyzxyz.supabase.co
const SUPABASE_KEY = 'sb_publishable_3UzyMZGJSaDSKkJH-dSbLg_QJXte5T-';

const isConfigured = SUPABASE_URL && SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE';

let supabase = null;
if (isConfigured) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("✅ Supabase initialized!");
} else {
  console.warn("⚠️ Supabase is not configured yet. Still falling back to LocalStorage.");
}

// Expose these async functions globally so `app.js` and `admin.js` can use them
window.fb_getNewsList = async function() {
  if (!isConfigured) {
      const saved = localStorage.getItem('wz_news_list');
      return saved ? JSON.parse(saved) : [];
  }
  
  try {
    const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error("Error fetching news from Supabase:", e);
    return [];
  }
};

window.fb_addNews = async function(item) {
  if (!isConfigured) {
    const list = await window.fb_getNewsList();
    list.unshift(item);
    localStorage.setItem('wz_news_list', JSON.stringify(list));
    return;
  }
  
  item.created_at = Date.now();
  
  const { error } = await supabase.from('news').insert([item]);
  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }
};

window.fb_updateNews = async function(id, item, idxForLocal) {
  if (!isConfigured) {
    const list = await window.fb_getNewsList();
    list[idxForLocal] = item;
    localStorage.setItem('wz_news_list', JSON.stringify(list));
    return;
  }
  
  const { error } = await supabase.from('news').update(item).eq('id', id);
  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }
};

window.fb_deleteNews = async function(id, idxForLocal) {
  if (!isConfigured) {
    const list = await window.fb_getNewsList();
    list.splice(idxForLocal, 1);
    localStorage.setItem('wz_news_list', JSON.stringify(list));
    return;
  }
  
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }
};
