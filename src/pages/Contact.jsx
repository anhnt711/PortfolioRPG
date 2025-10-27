export default function Contact(){
  return (
    <div className="max-w-xl mx-auto bg-neutral-900 rounded-2xl p-6">
      <h2 className="font-semibold mb-4">Send a Quest Scroll</h2>
      <form action="https://formspree.io/f/your-id" method="POST" className="grid gap-3">
        <input name="name" placeholder="Your name" className="bg-neutral-800 rounded px-3 py-2" />
        <input name="email" placeholder="Email" className="bg-neutral-800 rounded px-3 py-2" />
        <textarea name="message" rows="5" placeholder="Message" className="bg-neutral-800 rounded px-3 py-2"/>
        <button className="bg-blue-600 hover:bg-blue-500 rounded px-4 py-2">Send</button>
      </form>
    </div>
  );
}
