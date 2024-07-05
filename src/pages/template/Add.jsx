function Add({ name, link, buttonName }) {
  return (
    <div className="flex justify-between items-center">
      <p className=" text-xl">{name}</p>
      <a
        href={`/${link}`}
        className="px-4 py-2 bg-slate-900 text-white rounded-lg"
      >
        {buttonName}
      </a>
    </div>
  );
}

export default Add;
