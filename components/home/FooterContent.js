import { renderText } from "common/methods"

const FooterContent = ({ content }) => {
    return (
        <div className="w-full bg-white ">
             <input type="checkbox" className="read-more-state" id="web_read_more" />
            <div className="w-full p-4  mx-auto line_clamp">
                {renderText(content)}
            </div>
            <label htmlFor="web_read_more" className="read-more-trigger mx-2 my-2 text-center rounded-md w-32"></label>

        {/* <label htmlFor="web_read_more" className="read-more-trigger"></label> */}

    <style jsx>
        {`

            .line_clamp {
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;  
                overflow: hidden;
            }

            .read-more-state:checked ~ .line_clamp {
                overflow: visible;
                -webkit-line-clamp: 30000;
            }

        .read-more-state {
            display: none;
        }
        
        .read-more-target {
            opacity: 0;
            max-height: 0;
            font-size: 0;
            transition: 0.25s ease;
        }
        
        .read-more-state:checked ~ .read-more-wrap .read-more-target {
            opacity: 1;
            font-size: inherit;
            max-height: 999em;
        }
        
        .read-more-state ~ .read-more-trigger:before {
            content: "Show more";
        }
        
        .read-more-state:checked ~ .read-more-trigger:before {
            content: "Show less";
        }
        
        .read-more-trigger {
            cursor: pointer;
            display: inline-block;
            padding: 0 0.5em;
            color: #666;
            font-size: 0.9em;
            line-height: 2;
            border: 1px solid #ddd;
            border-radius: 0.25em;
        }
        
        `}
    </style>

        </div>
    )
}

export default FooterContent
