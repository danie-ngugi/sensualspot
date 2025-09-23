import Link from 'next/link'

const PageHeader = ({ title, paths }) => {
  return (
    <div>
      {title && <div className="mt-1 p-2 bg-white h-40 justify-center flex flex-col items-center font-semibold text-xl rounded-sm ">
        <h1 className="text-xl lg:text-4xl font-bold text-primary-1"> {title} </h1>
      </div>}
      <div className=" w-full bg-gray-300 rounded-sm p-1 text-gray-900">
        {paths.map((p)=> {
          const lastItem = paths[paths.length -1];
          const isLast = p.url === lastItem.url;
          return !p.active ? ((<Link key={p.url} href={`${p.url}`} className="text-sm text-gray-900">
            {p.name} {!isLast && '>'} 
          </Link>))
         : (<span key={p.url}> 
            <span className="text-sm text-gray-900">{p.name} {!isLast && '>'} </span>
          </span>);
        })}
      </div>
    </div>
  );
}

export default PageHeader

