function page({ params }: any) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Profile Page</h1>
      <h2 className="p-3 bg-green-500 text-white rounded">{params.id}</h2>
    </div>
  );
}

export default page;
