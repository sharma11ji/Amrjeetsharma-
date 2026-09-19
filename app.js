const state = {
  view: "dashboard",
  bookings: [
    { id:"BK-1042", customer:"Rahul Kumar", phone:"+91 98••••421", date:"2026-09-20", time:"10:00", duration:30, status:"confirmed" },
    { id:"BK-1043", customer:"Priya Singh", phone:"+91 87••••210", date:"2026-09-20", time:"10:30", duration:30, status:"confirmed" },
    { id:"BK-1044", customer:"Amit Verma", phone:"+91 76••••882", date:"2026-09-20", time:"11:30", duration:30, status:"cancelled" },
    { id:"BK-1045", customer:"Neha Sharma", phone:"+91 90••••117", date:"2026-09-21", time:"12:00", duration:30, status:"confirmed" }
  ],
  availability: {
    monday:["10:00","10:30","11:00","11:30","12:00","15:00","15:30","16:00","16:30","17:00"],
    tuesday:["10:00","10:30","11:00","11:30","12:00","15:00","15:30","16:00","16:30","17:00"],
    wednesday:["10:00","10:30","11:00","11:30","12:00","15:00","15:30","16:00","16:30","17:00"],
    thursday:["10:00","10:30","11:00","11:30","12:00","15:00","15:30","16:00","16:30","17:00"],
    friday:["10:00","10:30","11:00","11:30","12:00","15:00","15:30","16:00","16:30","17:00"],
    saturday:["10:00","10:30","11:00","11:30","12:00"],
    sunday:[]
  }
};

const app = document.querySelector("#app");

function esc(value){
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c]));
}

function formatDate(date){
  return new Intl.DateTimeFormat("en-IN",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(date+"T00:00:00"));
}

function statusBadge(status){
  return '<span class="badge '+status+'">'+esc(status[0].toUpperCase()+status.slice(1))+'</span>';
}

function render(){
  app.innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand"><div class="brand-mark">B</div><div><strong>BookFlow</strong><span>WhatsApp Booking</span></div></div>
        <nav>
          <button class="${state.view==="dashboard"?"active":""}" data-view="dashboard">▦ <span>Dashboard</span></button>
          <button class="${state.view==="bookings"?"active":""}" data-view="bookings">◷ <span>Bookings</span></button>
          <button class="${state.view==="availability"?"active":""}" data-view="availability">◫ <span>Availability</span></button>
          <button class="${state.view==="whatsapp"?"active":""}" data-view="whatsapp">◌ <span>WhatsApp Flow</span></button>
          <button class="${state.view==="settings"?"active":""}" data-view="settings">⚙ <span>Settings</span></button>
        </nav>
        <div class="sidebar-footer"><span class="online-dot"></span> MVP Demo</div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div><div class="eyebrow">LOCAL BUSINESS</div><h1>${pageTitle()}</h1></div>
          <div class="business-chip"><span class="avatar">R</span><span>Ravi Salon</span><span class="chevron">⌄</span></div>
        </header>
        <section class="content">${page()}</section>
      </main>
    </div>`;
  bind();
}

function pageTitle(){
  return ({dashboard:"Today",bookings:"Bookings",availability:"Availability",whatsapp:"Customer Flow",settings:"Business Settings"})[state.view];
}

function page(){
  if(state.view==="dashboard") return dashboard();
  if(state.view==="bookings") return bookings();
  if(state.view==="availability") return availability();
  if(state.view==="whatsapp") return whatsapp();
  return settings();
}

function dashboard(){
  const today = "2026-09-20";
  const todayBookings = state.bookings.filter(b=>b.date===today && b.status!=="cancelled");
  const upcoming = state.bookings.filter(b=>b.date>=today && b.status!=="cancelled").slice(0,5);
  return `
    <div class="stats">
      <div class="stat"><span>Today's bookings</span><strong>${todayBookings.length}</strong><small>Confirmed appointments</small></div>
      <div class="stat"><span>Upcoming</span><strong>${state.bookings.filter(b=>b.date>today && b.status!=="cancelled").length+todayBookings.length}</strong><small>Next 7 days</small></div>
      <div class="stat"><span>No-show rate</span><strong>4.2%</strong><small>Last 30 days</small></div>
      <div class="stat"><span>Reminders</span><strong>18</strong><small>Scheduled today</small></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-head"><div><h2>Today's schedule</h2><p>Sunday, 20 September 2026</p></div><button class="text-btn" data-view="bookings">View all</button></div>
        <div class="schedule">${todayBookings.map(b=>`
          <div class="booking-row">
            <div class="time">${esc(b.time)}<small>${b.duration} min</small></div>
            <div class="person"><strong>${esc(b.customer)}</strong><span>${esc(b.phone)}</span></div>
            ${statusBadge(b.status)}
          </div>`).join("")}</div>
      </div>
      <div class="card">
        <div class="card-head"><div><h2>How booking works</h2><p>Customer journey</p></div></div>
        <div class="steps">
          <div><b>1</b><span><strong>Customer says “Hi”</strong><small>WhatsApp starts the booking flow</small></span></div>
          <div><b>2</b><span><strong>Choose date & time</strong><small>Only available slots are shown</small></span></div>
          <div><b>3</b><span><strong>Confirm</strong><small>Booking is saved and calendar event created</small></span></div>
          <div><b>4</b><span><strong>Automatic reminders</strong><small>24h and 2h before the appointment</small></span></div>
        </div>
      </div>
    </div>
    <div class="card demo-card">
      <div><div class="eyebrow">LIVE DEMO</div><h2>Test the customer experience</h2><p>Open the simulated WhatsApp conversation and create a booking without touching the dashboard.</p></div>
      <button class="primary" data-view="whatsapp">Open customer flow →</button>
    </div>`;
}

function bookings(){
  return `
    <div class="toolbar"><div><p class="muted">All appointments</p></div><button class="primary" id="newBooking">+ New booking</button></div>
    <div class="card table-card"><table><thead><tr><th>Customer</th><th>Date</th><th>Time</th><th>Status</th><th>Booking ID</th></tr></thead><tbody>
    ${state.bookings.map(b=>`<tr><td><strong>${esc(b.customer)}</strong><small>${esc(b.phone)}</small></td><td>${formatDate(b.date)}</td><td>${esc(b.time)}</td><td>${statusBadge(b.status)}</td><td class="mono">${esc(b.id)}</td></tr>`).join("")}
    </tbody></table></div>`;
}

function availability(){
  const days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
  return `
    <div class="card availability-card">
      <div class="card-head"><div><h2>Working hours</h2><p>30-minute appointments · 15-minute buffer</p></div><button class="primary" id="saveAvailability">Save changes</button></div>
      <div class="day-list">${days.map(d=>`
        <div class="day-row"><div class="day-name"><strong>${d[0].toUpperCase()+d.slice(1)}</strong><span>${state.availability[d].length ? "Open" : "Closed"}</span></div>
        <div class="time-pills">${state.availability[d].length ? state.availability[d].map(t=>`<span>${t}</span>`).join("") : '<span class="closed">Closed</span>'}</div>
        </div>`).join("")}</div>
    </div>`;
}

function whatsapp(){
  return `
    <div class="flow-layout">
      <div class="phone">
        <div class="phone-top"><span>‹</span><strong>Ravi Salon</strong><span>⋮</span></div>
        <div class="chat" id="chat">
          <div class="bubble bot">Hi! Welcome to Ravi Salon.<br><br>What would you like to do?<div class="quick-list"><button data-action="book">Book an appointment</button><button data-action="reschedule">Reschedule</button><button data-action="cancel">Cancel</button></div></div>
        </div>
        <div class="composer"><input id="chatInput" placeholder="Type a message..." /><button id="sendMsg">➤</button></div>
      </div>
      <div class="card flow-info">
        <div class="eyebrow">STATE MACHINE</div><h2>Booking flow</h2>
        <div class="state-line"><span>NEW</span><i>→</i><span>MAIN MENU</span><i>→</i><span>SELECT DATE</span></div>
        <div class="state-line"><span>SELECT TIME</span><i>→</i><span>CONFIRM</span><i>→</i><span>CONFIRMED</span></div>
        <hr>
        <h3>Production integration</h3>
        <ul><li>Meta WhatsApp Cloud API webhook</li><li>Postgres/Supabase booking transaction</li><li>Google Calendar event creation</li><li>Scheduled utility-message reminders</li></ul>
        <p class="warning">This screen is a functional frontend simulator. Real WhatsApp messages require Meta Business/API credentials and a backend webhook.</p>
      </div>
    </div>`;
}

function settings(){
  return `
    <div class="card settings">
      <div class="card-head"><div><h2>Business settings</h2><p>These values control booking behavior.</p></div><button class="primary" id="saveSettings">Save</button></div>
      <label>Business name<input value="Ravi Salon" /></label>
      <label>Appointment duration<select><option>30 minutes</option><option>45 minutes</option><option>60 minutes</option></select></label>
      <label>Buffer time<select><option>15 minutes</option><option>10 minutes</option><option>0 minutes</option></select></label>
      <label>Timezone<input value="Asia/Kolkata" /></label>
      <div class="notice">Keep WhatsApp credentials and database secrets on the server. Never put Meta access tokens in frontend JavaScript.</div>
    </div>`;
}

function addBot(text){
  const chat=document.querySelector("#chat");
  chat.insertAdjacentHTML("beforeend",'<div class="bubble bot">'+text+"</div>");
  chat.scrollTop=chat.scrollHeight;
}

function addUser(text){
  const chat=document.querySelector("#chat");
  chat.insertAdjacentHTML("beforeend",'<div class="bubble user">'+esc(text)+"</div>");
  chat.scrollTop=chat.scrollHeight;
}

function bookingChoice(){
  addBot('Choose a date:<div class="quick-list"><button data-date="2026-09-20">Today · 20 Sep</button><button data-date="2026-09-21">Tomorrow · 21 Sep</button><button data-date="2026-09-22">22 Sep</button></div>');
}

function timeChoice(date){
  const used=state.bookings.filter(b=>b.date===date && b.status!=="cancelled").map(b=>b.time);
  const day=new Date(date+"T00:00:00").toLocaleDateString("en-US",{weekday:"long"}).toLowerCase();
  const slots=(state.availability[day]||[]).filter(t=>!used.includes(t));
  addBot('Available times for '+formatDate(date)+':<div class="quick-list">'+slots.slice(0,8).map(t=>'<button data-time="'+t+'" data-date="'+date+'">'+t+'</button>').join("")+"</div>");
}

function confirmBooking(date,time){
  addBot('Please confirm:<br><br><strong>'+formatDate(date)+' · '+time+'</strong><div class="quick-list"><button data-confirm="yes" data-date="'+date+'" data-time="'+time+'">Confirm booking</button><button data-action="book">Change time</button></div>');
}

function bind(){
  document.querySelectorAll("[data-view]").forEach(el=>el.onclick=()=>{state.view=el.dataset.view;render();});
  document.querySelector("#newBooking")?.addEventListener("click",()=>{state.view="whatsapp";render();});
  document.querySelector("#saveAvailability")?.addEventListener("click",()=>alert("Availability saved in this demo."));
  document.querySelector("#saveSettings")?.addEventListener("click",()=>alert("Settings saved in this demo."));
  document.querySelectorAll("[data-action]").forEach(el=>el.onclick=()=>{
    if(el.dataset.action==="book") bookingChoice();
    else addBot("For this MVP demo, choose Book to continue. Reschedule and Cancel will connect to existing booking records in the production backend.");
  });
  document.querySelectorAll("[data-date]").forEach(el=>el.onclick=()=>{
    addUser(el.textContent); timeChoice(el.dataset.date);
  });
  document.querySelectorAll("[data-time]").forEach(el=>el.onclick=()=>{
    addUser(el.dataset.time); confirmBooking(el.dataset.date,el.dataset.time);
  });
  document.querySelectorAll("[data-confirm]").forEach(el=>el.onclick=()=>{
    const id="BK-"+(1046+state.bookings.length);
    state.bookings.unshift({id,customer:"WhatsApp Customer",phone:"+91 ••••••",date:el.dataset.date,time:el.dataset.time,duration:30,status:"confirmed"});
    addUser("Confirm booking");
    addBot('Booking confirmed.<br><br><strong>'+formatDate(el.dataset.date)+' · '+el.dataset.time+'</strong><br>Booking ID: '+id+'<br><br>You will receive reminders 24h and 2h before your appointment.');
  });
  const input=document.querySelector("#chatInput"), send=document.querySelector("#sendMsg");
  send?.addEventListener("click",()=>handleMessage());
  input?.addEventListener("keydown",e=>{if(e.key==="Enter")handleMessage();});
}

function handleMessage(){
  const input=document.querySelector("#chatInput"); const value=input.value.trim(); if(!value)return;
  addUser(value); input.value="";
  const v=value.toLowerCase();
  if(v.includes("hi")||v.includes("hello")||v.includes("book")) bookingChoice();
  else if(v.includes("cancel")) addBot("Please choose the booking you want to cancel. In production, we will securely identify it from your WhatsApp number.");
  else if(v.includes("reschedule")) addBot("Please choose the booking you want to reschedule. In production, I will show its next available slots.");
  else addBot("I can help you book, reschedule, or cancel an appointment. Try “Book”.");
}

render();
