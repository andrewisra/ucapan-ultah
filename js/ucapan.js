// Fireworks animation
class Firework {
  constructor(canvas, x, y, color, big = false) {
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    const count = big ? 120 : 60;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = big ? Math.random() * 7 + 5 : Math.random() * 3 + 2;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        radius: big ? Math.random() * 5 + 3 : Math.random() * 2 + 1,
        color
      });
    }
  }
  update() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.alpha -= 0.015;
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
  }
  draw() {
    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 18;
      this.ctx.fill();
      this.ctx.restore();
    });
  }
}

// Typing animation
function typeWriter(element, text, speed = 50, callback) {
  element.innerHTML = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) {
      setTimeout(callback, 800);
    }
  }
  typing();
}

// Pesan ucapan
const messages = [
  "Udah tambah tua aja nih...",
  "Gimana kuliahnya aman?",
  "Semoga bertambahnya umur ini...",
  "juga bertambahnya kebahagiaan 💫",
  "bertambahnya kesehatan 💪",
  "bertambahnya rejeki 💵",
  "dan gak lupa bertambahnya IPK 📚",
  "Maaf banget telat...",
  "Ucapan ini aku buat sebagai gantinya 🎉"
];

const colors = ["#FFD700","#FF69B4","#00BFFF","#ADFF2F","#FF4500","#9400D3","#00FF7F"];

window.onload = function() {
  const container = document.querySelector(".ucapan-box");
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "100";
  document.body.appendChild(canvas);

  let fireworks = [];

  function showMessage(idx) {
    if (idx < messages.length) {
      const msgDiv = document.createElement("div");
      msgDiv.className = "message";
      container.appendChild(msgDiv);

      typeWriter(msgDiv, messages[idx], 50, () => {
        fireworks.push(
          new Firework(
            canvas,
            Math.random() * canvas.width,
            Math.random() * (canvas.height / 2),
            colors[idx % colors.length]
          )
        );
        showMessage(idx + 1);
      });
    } else {
      // CLEAR semua pesan, tampilkan penutup saja
      setTimeout(() => {
        container.innerHTML = "";
        const finalDiv = document.createElement("div");
        finalDiv.className = "message";
        finalDiv.style.fontSize = "2.1em";
        finalDiv.style.fontWeight = "bold";
        finalDiv.style.color = "#ffffffff";
        finalDiv.style.textShadow = "0 0 20px #eeeeeeaa";
        container.appendChild(finalDiv);

        typeWriter(finalDiv, "Dari lelaki paling tampan di ITB, Andrew 😎", 70, () => {
          fireworks.push(new Firework(canvas, canvas.width/2, canvas.height/2, "#FFD700", true));
          fireworks.push(new Firework(canvas, canvas.width/3, canvas.height/3, "#FF69B4", true));
          fireworks.push(new Firework(canvas, (canvas.width*2)/3, canvas.height/3, "#00BFFF", true));
        });
      }, 1000);
    }
  }

  // Fireworks loop
  function animate() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(fw => { fw.update(); fw.draw(); });
    fireworks = fireworks.filter(fw => fw.particles.length > 0);
    requestAnimationFrame(animate);
  }
  animate();

  // Mulai pesan pertama
  showMessage(0);
};
