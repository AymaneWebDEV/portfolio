const TestTailwind = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600">Tailwind CSS Test</h1>
      <p className="mt-4 text-lg text-gray-700">
        If this text is blue and styled, Tailwind CSS is working correctly!
      </p>
      <div className="mt-6 p-6 bg-blue-100 rounded-lg border border-blue-300">
        <p className="text-blue-800">
          This is a test component to verify Tailwind CSS is working.
        </p>
      </div>
    </div>
  );
};

export default TestTailwind;
