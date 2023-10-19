<script>
        window.setTimeout(startAnimation, 0);

        function startAnimation() {
            var canvas = document.querySelector("#scene"),
                ctx = canvas.getContext("2d"),
                particles = [],
                amount = 0,
                mouse = { x: 0, y: 0 },
                radius = 10;

            var colors = ["#004486", "#004486", "#004486", "#004486", "#004486"]; // Lighter shades of grey

            var copy = document.querySelector("#copy");

            var ww = canvas.width = window.innerWidth;
            var wh = 350; // Set canvas height to 350px

            function Particle(x, y) {
                this.x = Math.random() * -ww;
                this.y = Math.random() * wh;
                this.dest = {
                    x: x,
                    y: y
                };
                this.r = Math.random() * 0.7 + 0.3;
                this.vx = (Math.random() + 0.2) * 0.3; // Increased speed
                this.vy = (Math.random() - 0.15) * 0.1;
                this.accX = 0;
                this.accY = 0;
                this.friction = Math.random() * 0.01 + 0.94;

                this.color = colors[Math.floor(Math.random() * colors.length)]; // Random grey color
            }

            Particle.prototype.render = function () {
                this.accX = (this.dest.x - this.x) / 800; // Increased animation speed
                this.accY = (this.dest.y - this.y) / 200;
                this.vx += this.accX;
                this.vy += this.accY;
                this.vx *= this.friction;
                this.vy *= this.friction;

                this.x += this.vx;
                this.y += this.vy;

                ctx.fillStyle = this.color;
                ctx.fillRect(this.x - this.r / 2, this.y - this.r / 2, this.r * 2, this.r * 2); // Draw a rectangle

                var a = this.x - mouse.x;
                var b = this.y - mouse.y;

                var distance = Math.sqrt(a * a + b * b);
                if (distance < radius * 5) {
                    this.accX = (this.x - mouse.x) / 100;
                    this.accY = (this.y - mouse.y) / 100;
                    this.vx += this.accX;
                    this.vy += this.accY;
                }

                if (this.x > ww) {
                    this.x = Math.random() * -ww;
                    this.y = Math.random() * wh;
                }
            }

            function onMouseMove(e) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            }

            function onTouchMove(e) {
                if (e.touches.length > 0) {
                    mouse.x = e.touches[0].clientX;
                    mouse.y = e.touches[0].clientY;
                }
            }

            function onTouchEnd(e) {
                mouse.x = -9999;
                mouse.y = -9999;
            }

            function initScene() {
                ww = canvas.width = window.innerWidth;
                wh = 350; // Set canvas height to 350px

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.font = "bold " + (wh / 2) + "px 'Montserrat', sans-serif"; // Adjust font size as needed
                ctx.textAlign = "center"; // Center the text
                ctx.fillText(copy.value, ww / 2, wh / 2); // Center the text

                var data = ctx.getImageData(0, 0, ww, wh).data;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = "screen";

                particles = [];
                for (var i = 0; i < ww; i += Math.round(ww / 600)) {
                    for (var j = 0; j < wh; j += Math.round(ww / 550)) {
                        if (data[((i + j * ww) * 4) + 3] > 150) {
                            particles.push(new Particle(i, j));
                        }
                    }
                }
                amount = particles.length;
            }

            function onMouseClick() {
                radius++;
                if (radius === 3) {
                    radius = 0;
                }
            }

            function render(a) {
                requestAnimationFrame(render);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < amount; i++) {
                    particles[i].render();
                }
            };

            copy.addEventListener("keyup", initScene);
            window.addEventListener("resize", initScene);
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("touchmove", onTouchMove);
            window.addEventListener("click", onMouseClick);
            window.addEventListener("touchend", onTouchEnd);
            initScene();
            requestAnimationFrame(render);
        }
    </script>
