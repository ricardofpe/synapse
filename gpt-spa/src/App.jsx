function App() {
  return (
    <>
      <div className="p-5 h-screen bg-black">
        <div className="container mx-auto bg-gray-900 h-full flex flex-col">
          <div className="flex-grow"></div>
          <div className="h-[100px] p-3 flex justify-center items-center bg-gray-700">
            <input
              type="text"
              placeholder="Type something..."
              className="w-full p-2 bg-transparent text-white border-white border-2 rounded-md outline-none"
            />
            <button className="bg-violet-600 px-3 py-2 mx-2 rounded-md text-white cursor-pointer">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
