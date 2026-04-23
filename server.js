import exp from "express";
import userRoutes from "./routers/user.route.js";

const app = exp();

app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Node.js CRUD API</title>
    <style>
      :root {
        --bg-1: #f8f4ec;
        --bg-2: #d9e8f5;
        --ink: #1f2a36;
        --card: rgba(255, 255, 255, 0.65);
        --accent: #0f7a6c;
        --accent-2: #ef6f3c;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Trebuchet MS", "Segoe UI", sans-serif;
        color: var(--ink);
        background: linear-gradient(135deg, var(--bg-1), var(--bg-2));
        display: grid;
        place-items: center;
        overflow: hidden;
      }

      .shape {
        position: absolute;
        border-radius: 999px;
        filter: blur(1px);
        opacity: 0.35;
        animation: float 8s ease-in-out infinite;
      }

      .shape.one {
        width: 220px;
        height: 220px;
        background: #ffd29d;
        top: 8%;
        left: -40px;
      }

      .shape.two {
        width: 300px;
        height: 300px;
        background: #9bd6cc;
        right: -80px;
        bottom: -40px;
        animation-delay: 1.4s;
      }

      .shape.three {
        width: 160px;
        height: 160px;
        background: #f6a6a6;
        top: 55%;
        left: 15%;
        animation-delay: 2.2s;
      }

      .card {
        position: relative;
        z-index: 2;
        width: min(90vw, 760px);
        padding: 2.2rem;
        border: 1px solid rgba(255, 255, 255, 0.85);
        border-radius: 20px;
        background: var(--card);
        backdrop-filter: blur(8px);
        box-shadow: 0 25px 55px rgba(13, 28, 45, 0.18);
        animation: rise 700ms ease-out;
      }

      h1 {
        margin: 0;
        font-size: clamp(1.8rem, 3.4vw, 2.9rem);
        letter-spacing: 0.03em;
      }

      p {
        margin: 0.85rem 0 0;
        line-height: 1.65;
      }

      .routes {
        margin-top: 1.4rem;
        display: grid;
        gap: 0.55rem;
      }

      .route {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-size: 0.96rem;
        animation: slideIn 650ms ease-out both;
      }

      .route:nth-child(2) {
        animation-delay: 140ms;
      }

      .route:nth-child(3) {
        animation-delay: 240ms;
      }

      .method {
        font-weight: 700;
        min-width: 58px;
        text-align: center;
        border-radius: 999px;
        padding: 0.2rem 0.55rem;
        color: #fff;
        background: var(--accent);
      }

      .method.mixed {
        background: var(--accent-2);
      }

      code {
        background: rgba(16, 26, 38, 0.08);
        padding: 0.12rem 0.32rem;
        border-radius: 6px;
      }

      @keyframes rise {
        from {
          opacity: 0;
          transform: translateY(24px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-14px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-24px);
        }
      }
    </style>
  </head>
  <body>
    <div class="shape one"></div>
    <div class="shape two"></div>
    <div class="shape three"></div>

    <main class="card">
      <h1>Node.js CRUD API</h1>
      <p>
        Welcome. This project exposes REST endpoints for user resources under
        <code>/api/v1</code>.
      </p>

      <section class="routes">
        <div class="route">
          <span class="method">GET</span>
          <span><code>/api/v1/users</code> (all users)</span>
        </div>
        <div class="route">
          <span class="method">POST</span>
          <span><code>/api/v1/users</code> (create user)</span>
        </div>
        <div class="route">
          <span class="method mixed">GET | PUT | DELETE</span>
          <span><code>/api/v1/users/:id</code> (single user actions)</span>
        </div>
      </section>
    </main>
  </body>
</html>`);
});

app.use("/api/v1", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});