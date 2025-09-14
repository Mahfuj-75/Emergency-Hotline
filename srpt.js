
const heartCountEl=document.getElementById("heart-count");
const coinCountEl=document.getElementById("coin-count");
const copyCountEl=document.getElementById("copy-count-text");
const cardContainer=document.getElementById("card-container");
const historyList=document.getElementById("history-list");
const clearHistoryBtn=document.getElementById("clear-history-btn");


let heartCount =0;
let coinCount =100;
let copyCount =0;
const services= 
[
  { name:"জাতীয় জরুরি নম্বর",eng:"National Emergency", hotline: "999", category: "জরুরি", icon: "assets/emergency.png"},
  { name:"পুলিশ হেল্পলাইন নম্বর",eng:"Police", hotline: "999", category: "পুলিশ", icon: "assets/police.png"},
  { name:"ফায়ার সার্ভিস নম্বর",eng:"Fire services", hotline: "999", category: "ফায়ার", icon: "assets/fire-service.png"},
  { name:"অ্যাম্বুলেন্স পরিষেবা",eng:"Ambulance", hotline: "1994-999999", category: "স্বাস্থ্য", icon: "assets/ambulance.png"},
  { name:"নারী ও শিশু হেল্পলাইন",eng:"Women & Child Helpline", hotline: "109", category: "নারী ও শিশু হেল্পলাইন", icon: "assets/emergency.png"},
  { name:"দুর্নীতি দমন হেল্পলাইন",eng:"Anti Corruption", hotline: "106", category: "সরকার", icon: "assets/emergency.png"},
  { name:"বিদ্যুৎ হেল্পলাইন",eng:"Electricity", hotline: "16216", category: "বিদ্যুৎ", icon: "assets/emergency.png" },
  { name:"ব্র্যাক হেল্পলাইন",eng:"Brac", hotline: "16445", category: "এনজিও", icon: "assets/brac.png"},
  { name:"বাংলাদেশ রেলওয়ে হেল্পলাইন",eng:"Bangladesh Railway", hotline: "163", category: "ভ্রমণ", icon: "assets/Bangladesh-Railway.png"},
];

function renderCards() 
{
  services.forEach(s => 
    {
    const card = document.createElement("div");
    card.className = "bg-white p-6 rounded-xl shadow-md";
    card.innerHTML = `
      <div class="flex justify-between items-center mb-3">
        <img src="${s.icon}" class="w-12 h-12">
        <span class="heart-btn cursor-pointer"><i class="far fa-heart"></i></span>
      </div>
      <h4 class="font-bold">${s.name}</h4>
      <p class="text-sm text-gray-500">${s.eng}</p>
      <p class="text-2xl font-bold mt-2">${s.hotline}</p>
      <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">${s.category}</span>
      <div class="flex gap-2 mt-3">
        <button class="copy-btn bg-gray-200 px-3 py-1 rounded" data-hotline="${s.hotline}">
          <i class="far fa-copy"></i> Copy
        </button>
        <button class="call-btn bg-green-600 text-white px-3 py-1 rounded" data-name="${s.name}" data-hotline="${s.hotline}">
          <i class="fas fa-phone"></i> Call
        </button>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

cardContainer.addEventListener("click", e => 
    {
  if (e.target.closest(".heart-btn")) 
    {
    heartCount++;
    heartCountEl.textContent = heartCount;
    e.target.closest(".heart-btn").innerHTML = '<i class="fas fa-heart text-red-500"></i>';
  }

  if (e.target.closest(".call-btn")) 
    {
    const btn = e.target.closest(".call-btn");
    const name = btn.dataset.name;
    const hotline = btn.dataset.hotline;

    if (coinCount >= 20) 
        {
      coinCount -= 20;
      coinCountEl.textContent = coinCount;
      alert(`Calling ${name} at ${hotline}`);

      const li = document.createElement("li");
      li.className = "bg-gray-100 p-2 rounded flex justify-between";
      li.innerHTML = `<span>${name} - ${hotline}</span><span>${new Date().toLocaleTimeString()}</span>`;
      historyList.prepend(li);
    } 
    else 
    {
      alert("Not enough coins!");
    }
  }

  if (e.target.closest(".copy-btn")) 
    {
    const hotline = e.target.closest(".copy-btn").dataset.hotline;
    navigator.clipboard.writeText(hotline);
    copyCount++;
    copyCountEl.textContent = `${copyCount} Copy`;
    alert(`Copied: ${hotline}`);
  }
});
clearHistoryBtn.addEventListener("click", () => 
{
  historyList.innerHTML = "";
});
renderCards();
