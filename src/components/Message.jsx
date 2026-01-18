import coming_soon from "../assets/coming_soon.gif";

const Message = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center text-center space-y-8 p-4">
          <div className="w-full max-w-md">
            <img
              src={coming_soon}
              alt="Coming Soon"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Message</h1>
            <p className="text-lg">
              We're working hard to bring you a better way to connect. Stay
              tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;