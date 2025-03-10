import { useCallback, useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";
import { formatNumberWithSpaces } from "../../../utils";

//cart [{
//   "id": "Sat Mar 01 2025 11:50:54 GMT+0500 (Узбекистан, стандартное время)",
//   "name": "Hara Bhara Kebab",
//   "quantity": 1,
//   "price": 220
// }]
const MenuContainer = () => {
  const [selectedMenu, setSelectedMenu] = useState(menus[0]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const increment = (item) => {
    handleAddToCart({
      ...item,
      quantity: item.quantity + 1,
    });
  };

  const decrement = (item) => {
    if (item.quantity <= 0) return;
    handleAddToCart({
      ...item,
      quantity: item.quantity + 1,
    });
  };

  const handleAddToCart = useCallback(
    (item) => {
      if (item.quantity === 0) return;

      const newObj = {
        ...item,
        totalPrice: item.price * item.quantity,
      };

      dispatch(addItems(newObj));
      // setItemCount(0);
    },
    [dispatch]
  );

  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
              style={{ backgroundColor: menu.bgColor }}
              onClick={() => {
                setSelectedMenu(menu);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.icon} {menu.name}
                </h1>
                {selectedMenu.id === menu.id && (
                  <GrRadialSelected className="text-white" size={20} />
                )}
              </div>
              <p className="text-[#ababab] text-sm font-semibold">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {selectedMenu?.items.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => increment(item)}
              className={`flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer transition-colors duration-300 hover:bg-[#2a2a2a] transform transition-transform ease-in-out active:scale-95 ${
                item.image
                  ? "bg-cover bg-center bg-blend-multiply"
                  : "bg-[#1a1a1a]"
              }`}
              style={
                item.image
                  ? {
                      backgroundImage: `url(${item.image})`,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }
                  : {}
              }
            >
              <div className="flex items-start justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {item.name}
                </h1>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                    handleAddToCart(item);
                  }}
                  className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg"
                >
                  <FaShoppingCart size={20} />
                </button>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-[#f5f5f5] text-xl font-bold">
                  {formatNumberWithSpaces(item.price)} UZS
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;
