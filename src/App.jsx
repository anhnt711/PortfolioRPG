import Header from "./components/Header";
import Home from "./pages/Home";
// ...

export default function App() {
  return (
    <div id="top" className="relative min-h-screen text-neutral-900">
      {/* overlay mờ để tăng tương phản */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>

      {/* nội dung chính */}
      <div className="relative z-10">
        <Header />
          {/* <Home /> */}
        <main className="max-w-6xl mx-auto px-4 pb-24">
          <section id="info" className="scroll-mt-24 py-12">{/* ... */}</section>
            <section id="skills" className="scroll-mt-24 py-12">{/* ... */}</section>
            <section id="quests" className="scroll-mt-24 py-12">{/* ... */}</section>
            <section id="projects" className="scroll-mt-24 py-12">{/* ... */}</section>
            <section id="contact" className="scroll-mt-24 py-12">{/* ... */}</section>
        </main>
      </div>
    </div>
  );
}

