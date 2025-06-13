import{c as u}from"./style-BW4IVdud.js";const m="https://gdfpwixfrujkoxlejcgo.supabase.co",g="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZnB3aXhmcnVqa294bGVqY2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTY0NjMsImV4cCI6MjA2MzMzMjQ2M30.btatLN5ciqWbERzsaDvk6yyTI2eJJY1wjTUDFsmA00Q",i=u(m,g);let r=null;async function y(){await p(),h(),await l()}async function p(){const{data:{user:t},error:e}=await i.auth.getUser();e&&console.error("Auth error:",e),r=t,console.log("Current user:",r),d()}function d(){const t=document.getElementById("auth-section");t&&(r?(t.innerHTML=`
      <span class="text-gray-700 text-sm sm:text-base mb-2 sm:mb-0 sm:mr-4">
        Witaj, ${r.email}
      </span>
      <button onclick="logout()" 
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-full sm:w-auto">
        Wyloguj
      </button>
    `,t.className="flex flex-col sm:flex-row items-center"):(t.innerHTML=`
      <a href="/login/" 
         class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition block text-center w-full sm:inline-block sm:w-auto">
        Zaloguj
      </a>
    `,t.className="flex"))}function h(){window.onpopstate=()=>l(),document.addEventListener("click",async t=>{t.target.tagName==="A"&&(t.preventDefault(),history.pushState(null,"",t.target.href),await l())})}async function l(){const t=window.location.pathname,e=document.getElementById("content");if(t.includes("/login")){const n=await(await fetch("/login/index.html")).text();e.innerHTML=n}const{data:a,error:c}=await i.from("article").select("*").order("created_at",{ascending:!1});c&&console.error("Error loading article:",c),e.innerHTML=`
    <section class="mb-8">
      ${r?`
        <button onclick="openAddArticleModal()" 
                class="mb-10 mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          + Dodaj artykuł
        </button>
      `:""}
      <div id="articles-list" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"></div>
    </section>
  `;const s=document.getElementById("articles-list");a==null||a.forEach(o=>{const n=document.createElement("article");n.className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition",n.innerHTML=`
      <div class="p-6">
        <h2 class="text-xl font-bold mb-2">${o.title}</h2>
        <h3 class="text-gray-600 mb-3">${o.subtitle}</h3>
        <div class="flex justify-between text-sm text-gray-500 mb-4">
          <span>${o.author||"Anonim"}</span>
          <span>${new Date(o.created_at).toLocaleDateString()}</span>
        </div>
        <p class="text-gray-700">${o.content}</p>
      </div>
      ${r?`
      <div class="bg-gray-50 px-6 py-3 flex justify-end space-x-2 mb-2">
        <button onclick="openEditArticleModal('${o.id}')" 
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Edytuj
        </button>
        <button onclick="deleteArticle('${o.id}')" 
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Usuń
        </button>
      </div>
      `:""}
    `,s.appendChild(n)})}window.openAddArticleModal=()=>{document.getElementById("modal-title").textContent="Dodaj nowy artykuł",document.getElementById("article-form").reset(),document.getElementById("article-id").value="",document.getElementById("modal").classList.remove("hidden")};window.openEditArticleModal=async t=>{const{data:e,error:a}=await i.from("article").select("*").eq("id",t).single();if(a){console.error("Error loading article:",a);return}document.getElementById("modal-title").textContent="Edytuj artykuł",document.getElementById("article-id").value=t,document.getElementById("title").value=e.title,document.getElementById("subtitle").value=e.subtitle||"",document.getElementById("author").value=e.author,document.getElementById("article-content").value=e.content,document.getElementById("modal").classList.remove("hidden")};window.closeModal=()=>{document.getElementById("modal").classList.add("hidden")};document.getElementById("article-form").addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("article-id").value,a=!e,c=document.getElementById("article-content");if(!c){console.error("Nie znaleziono pola content!");return}const s=c.value.trim();if(!s){alert("Treść nie może być pusta!");return}const o={title:document.getElementById("title").value,subtitle:document.getElementById("subtitle").value,author:document.getElementById("author").value,content:s,created_at:new Date().toISOString()};a&&r&&(o.user_id=r.id);try{if(a){const{error:n}=await i.from("article").insert(o);if(n)throw n}else{const{error:n}=await i.from("article").update(o).eq("id",e);if(n)throw n}closeModal(),await l()}catch(n){console.error("Error saving article:",n),alert("Wystąpił błąd podczas zapisywania artykułu")}});window.deleteArticle=async t=>{if(confirm("Czy na pewno chcesz usunąć ten artykuł?"))try{const{error:e}=await i.from("article").delete().eq("id",t);if(e)throw e;await l()}catch(e){console.error("Error deleting article:",e),alert("Wystąpił błąd podczas usuwania artykułu")}};window.logout=async()=>{try{await i.auth.signOut(),r=null,d(),await l()}catch(t){console.error("Logout error:",t)}};document.addEventListener("DOMContentLoaded",y);
