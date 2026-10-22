import { useState } from "react";

const SECTIONS = [
  {
    title: "店舗運営",
    apps: [
      {
        icon: "icon-beans.png",
        name: "豆プロファイル",
        desc: "豆・農園・産地の情報",
        url: "https://aboutuscoffee.github.io/aboutus-beans-profile/",
      },
      {
        icon: "icon-staff.png",
        name: "スタッフ・タスク",
        desc: "担当制度・タスク管理",
        url: "https://aboutuscoffee.github.io/aboutus-staff-todo/",
      },
      {
        icon: "icon-order-sheet.svg",
        name: "発注表",
        desc: "在庫・発注数の入力",
        url: "https://aboutuscoffee.github.io/aboutus-order-sheet/",
      },
      {
        icon: "icon-okashi.svg",
        name: "仕込みTodo表",
        desc: "お菓子の仕込みスケジュール",
        url: "https://aboutuscoffee.github.io/aboutus-okashi-scheduler/",
      },
    ],
  },
  {
    title: "売上・分析",
    apps: [
      {
        icon: "icon-sales.png",
        name: "売上管理",
        desc: "日報入力・売上推移",
        url: "https://aboutuscoffee.github.io/aboutus-sales/",
      },
      {
        icon: "icon-yoy.png",
        name: "売上昨対",
        desc: "天気・曜日調整後の昨対",
        url: "https://aboutuscoffee.github.io/aboutus-sales-yoy/",
      },
    ],
  },
  {
    title: "品質・接客",
    apps: [
      {
        icon: "icon-food-qc.svg",
        name: "フード仕込みQC",
        desc: "仕込みのクオリティチェック",
        url: "https://aboutuscoffee.github.io/aboutus-food-qc/",
      },
      {
        icon: "icon-drip-qc.svg",
        name: "ドリップ抽出QC",
        desc: "抽出品質のQC報告書",
        url: "https://aboutuscoffeeinfo-lgtm.github.io/CoffeeQC/",
      },
      {
        icon: "icon-service-notes.svg",
        name: "接客ノート",
        desc: "接客の気づき・共有",
        url: "https://aboutuscoffee.github.io/aboutus-service-notes/",
      },
      {
        icon: "icon-trouble-box.svg",
        name: "お悩みBOX",
        desc: "スタッフのお悩み投稿",
        url: "https://aboutuscoffee.github.io/aboutus-trouble-box/",
      },
      {
        icon: "icon-beans-quiz.svg",
        name: "Profileチェック",
        desc: "豆プロファイルのクイズ",
        url: "https://aboutuscoffee.github.io/aboutus-beans-quiz/",
      },
    ],
  },
  {
    title: "お客様・社外向け",
    apps: [
      {
        icon: "icon-beans-story.png",
        name: "豆のストーリー",
        desc: "お客様向けの豆紹介",
        url: "https://aboutuscoffee.github.io/aboutus-beans-story/",
      },
      {
        icon: "icon-wholesale.png",
        name: "卸カタログ",
        desc: "社外向け卸の注文",
        url: "https://aboutuscoffee.github.io/aboutus-wholesale/",
      },
    ],
  },
];

const PASSWORD_HASH = import.meta.env.VITE_PASSWORD_HASH;
const STORAGE_KEY = "mypage-unlocked";

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function readUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === PASSWORD_HASH;
  } catch {
    return false;
  }
}

function Lock({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (PASSWORD_HASH && (await sha256(value)) === PASSWORD_HASH) {
      try {
        localStorage.setItem(STORAGE_KEY, PASSWORD_HASH);
      } catch {}
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f1f8] flex flex-col items-center justify-center px-4">
      <img
        src={`${import.meta.env.BASE_URL}icon-192.png`}
        alt=""
        className="w-20 h-20 rounded-2xl shadow-md mb-6"
      />
      <form onSubmit={submit} className="w-full max-w-xs flex flex-col gap-3">
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="パスワード"
          autoFocus
          className="w-full rounded-xl border border-[#c9c3dd] bg-white px-4 py-3 text-[#2f2b3a] outline-none focus:border-[#7f8ccc]"
        />
        {error && <p className="text-xs text-[#b0607a] text-center">パスワードが違います</p>}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-br from-[#6c8ace] to-[#a684c4] py-3 text-white font-bold active:scale-95 transition"
        >
          ひらく
        </button>
      </form>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(readUnlocked);

  if (!unlocked) return <Lock onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="min-h-screen bg-[#f3f1f8] flex flex-col items-center px-4 py-10">
      <div className="text-center mb-8">
        <p className="text-2xl font-bold text-[#2f2b3a]">About Us Coffee</p>
        <p className="text-sm text-[#6f6a8a] mt-1">Private</p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <p className="text-xs font-bold tracking-wider text-[#7f8ccc] mb-3">{section.title}</p>
            <div className="grid grid-cols-3 gap-x-3 gap-y-5">
              {section.apps.map((app) => (
                <a
                  key={app.url}
                  href={app.url}
                  className="flex flex-col items-center gap-1.5 active:scale-95 transition"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${app.icon}`}
                    alt={app.name}
                    className="w-16 h-16 rounded-2xl shadow-md"
                  />
                  <span className="text-xs font-bold text-[#2f2b3a] text-center leading-tight">
                    {app.name}
                  </span>
                  <span className="text-[10px] text-[#6f6a8a] text-center leading-tight">
                    {app.desc}
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
