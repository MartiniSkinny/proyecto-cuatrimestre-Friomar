import { render } from "react-dom";
import "./slide_scroll.css";


export default function Slider({
    height,
    itemWidth,
    items,
    className,
}) {

    const renderItem = (child, index) => (
        <div
            key={index}
            className="h-full absolute"
            style={{ left: `${index * (itemWidth + 10)}px`, width: `${itemWidth}px!important` }}
        >
            {child}
        </div>
    );

    return (
        <div className={`${className} w-full block`}>
            <div
                className={`overflow-x-auto w-full relative mySlider`}
                style={{ height: `${height}px` }}
            >
                {items?.map((item, index) => {
                    return renderItem(item, index);
                })}
            </div>
        </div>
    );
}