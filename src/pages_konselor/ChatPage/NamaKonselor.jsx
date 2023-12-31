/* eslint-disable react/prop-types */
const NamaKonselor = ({nama}) => {
  return (
    <button className="w-full flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
      <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
        {nama[0]}
      </div>
      <div className="ml-2 text-sm font-semibold">{nama}</div>
    </button>
  );
};

export default NamaKonselor;
