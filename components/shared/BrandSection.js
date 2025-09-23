import Link from 'next/link'

const BrandsSection = ({ brands, categories }) => {
    // console.log(brands, 'brands')
  return (
    <div className="m-1 p-1 ">
      {
        categories.map(category => {
          return (
            <div key={category._id} className={category.name}>
              <div className="brand_section  border-0 mt-3 border-gray-200 p-2 rounded-lg">
                <div className="capitalize-first brand_heading font-semibold">
                  {category.name}
                </div>
                <input type="checkbox" className="show-all-state" id={`${category}_brand`} />
                <div className="col-12 m-1 _">
                  {
                    brands.filter(b => b.categoryId == category._id).map(brand => {
                      return (
                        <div className="brand_item capitalize-first px-3 py-1" key={brand._id}>
                          <Link href={`/brand/${brand.url}`} legacyBehavior>
                            <a>
                              {brand.name}
                            </a>
                          </Link>
                        </div>
                      );
                    })
                  }
                </div>
                {/* <label
                  htmlFor={`${category.name}_brand`}
                  className={`show-all-trigger ml-4 mt-2 w-24 text-sm  ${brands[category].length > 10 ? 'show_all' : 'hide-d'}
                        ${brandItems[category].length > 3 && brandItems[category].length < 10 ? ' show_m' : ''}
                        ${brandItems[category].length < 3 && ' show_n'}
                        `} ></label> */}
              </div>
              <style jsx>{`

                .brand_clamp {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                }

                .show-all-state:checked ~ .show-all-wrap .read-more-target {
                    opacity: 1;
                    font-size: inherit;
                    max-height: 999em;
                }

                .show-all-state ~ .show-all-trigger:before {
                    content: "Show more";
                }

                .show-all-state:checked ~ .show-all-trigger:before {
                    content: "Show less";
                }

                .show-all-state:checked ~ .brand_clamp {
                overflow: visible;
                -webkit-line-clamp: 30000;
                }

                .show-all-state ~ .show-all-trigger:before {
                content: "View all";
                }

                .show-all-state:checked ~ .show-all-trigger:before {
                    content: "Show less";
                }

                .brand_heading {
                    font-size: 18px;
                    color: var(--secondary-color)
                  }
                  .brand_item {
                    display: inline-block;
                    color: #212121;
                    border: 2px solid rgba(0, 0, 0, 0.03);
                    margin: 2px;
                    border-radius: 15px;
                    transition: all ease 0.4s;
                  }
                  .brand_item a{
                    color: #212121;
                  }
                  .brand_item:hover{
                    color: var(--accent-color);
                    border: 2px solid var(--secondary-color);
                  }

                  .read-more-state, .show-all-state {
                    display: none;
                  }

                  .read-more-trigger, .show-all-trigger {
                    cursor: pointer;
                    display: inline-block;
                    padding: 0 0.5em;
                    color: var(--secondary-color);
                    line-height: 2;
                    border: 1px solid #ddd;
                    border-radius: 25px;
                    text-align: center;
                }
              
              `}</style>
            </div>
          );
        })
      }
    </div>
  );
}

export default BrandsSection