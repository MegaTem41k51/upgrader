const items=[
 {name:"Emerald Knife",rarity:"SPECIAL",price:2400,icon:"◆"},
 {name:"Neon Rifle",rarity:"RARE",price:1750,icon:"◈"},
 {name:"Phantom Pistol",rarity:"EPIC",price:920,icon:"◇"},
 {name:"Carbon SMG",rarity:"STANDARD",price:420,icon:"▰"},
 {name:"Azure Rifle",rarity:"RARE",price:1250,icon:"◈"},
 {name:"Violet Blade",rarity:"EPIC",price:2100,icon:"◆"},
 {name:"Shadow Pistol",rarity:"STANDARD",price:390,icon:"◇"},
 {name:"Mint SMG",rarity:"RARE",price:760,icon:"▰"}
];
let state=JSON.parse(localStorage.getItem("upgradeDemo")||'null')||{name:"",balance:10000,inventory:items.slice(0,4)};
const $=id=>document.getElementById(id);
function money(n){return n.toLocaleString("ru-RU")}
function save(){localStorage.setItem("upgradeDemo",JSON.stringify(state));render()}
function renderCard(x){return `<div class="item"><div class="rarity">${x.rarity}</div><div class="item-art">${x.icon}</div><div class="item-name">${x.name}</div><div class="price">${money(x.price)} DEMO</div></div>`}
function render(){
 $("balance").textContent=money(state.balance);
 $("featured").innerHTML=items.map(renderCard).join("");
 $("inventoryGrid").innerHTML=state.inventory.length?state.inventory.map(renderCard).join(""):"<p>Инвентарь пуст.</p>";
 $("profileName").textContent=state.name||"Гость";
 $("profileId").textContent=state.name?"Локальный демо-аккаунт":"Войдите, чтобы создать локальный демо-профиль.";
 $("avatar").textContent=state.name?(state.name[0]||"?").toUpperCase():"?";
 $("profileBalance").textContent=money(state.balance);
 $("itemCount").textContent=state.inventory.length;
 $("loginBtn").textContent=state.name?"Аккаунт":"Войти";
}
function show(id){document.querySelectorAll(".page").forEach(x=>x.classList.add("hidden"));$(id).classList.remove("hidden");location.hash=id}
window.addEventListener("hashchange",()=>{show(location.hash.slice(1)||"home")});
$("loginBtn").onclick=()=>state.name?show("profile"):($("loginModal").classList.remove("hidden"));
function closeLogin(){$("loginModal").classList.add("hidden")}
function login(){let n=$("nameInput").value.trim();if(!n)return toast("Введите ник");state.name=n;closeLogin();save();show("profile");toast("Демо-аккаунт создан")}
function addDemoItem(){state.inventory.push(items[Math.floor(Math.random()*items.length)]);save();toast("Демо-предмет добавлен")}
function toast(t){$("toast").textContent=t;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800)}
render();show(location.hash.slice(1)||"home");