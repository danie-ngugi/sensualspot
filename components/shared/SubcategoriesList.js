import Link from "next/link"

const SubcategoriesList = ({category, subcategories }) => {


    return (
        <div className="mb-8 w-full  flex flex-row flex-wrap gap-3  lg:hidden">

            {subcategories?.map((subcategory) => {
                return (
                    <div key={subcategory.url}>
                       <Link
                           href={`/${category.url}/${subcategory.url}`}
                           className="bg-white px-4 py-3 rounded-md inline-block">
                            {subcategory.name}
                       </Link>
                    </div>
                );
            })}


        </div>
    );
}

export default SubcategoriesList