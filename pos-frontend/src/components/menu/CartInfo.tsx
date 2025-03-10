import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatNumberWithSpaces } from "../../../utils";
import { removeItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const scrolLRef = useRef();
  const dispatch = useDispatch();

  // Store previous cartData for comparison
  const prevCartData = useRef(cartData);
  // Create a ref object to hold references for each item's container
  const itemRefs = useRef({});

  // Scroll the main container on any change to cartData
  useEffect(() => {
    if (scrolLRef.current) {
      scrolLRef.current.scrollTo({
        top: scrolLRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  // Compare current and previous cartData to check for quantity increases
  useEffect(() => {
    cartData.forEach((item) => {
      const prevItem = prevCartData.current.find((prev) => prev.id === item.id);
      if (prevItem && item.quantity > prevItem.quantity) {
        const el = itemRefs.current[item.id];
        if (el) {
          // Add highlight classes (change bg to green and apply a pulse animation)
          el.classList.add("animate-pulse", "bg-green-600");
          // Scroll that item into view (centered within the scroll container)
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          // Remove the highlight after 500ms
          setTimeout(() => {
            el.classList.remove("animate-pulse", "bg-green-600");
          }, 500);
        }
      }
    });
    // Update previous cart data for the next comparison
    prevCartData.current = cartData;
  }, [cartData]);

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>
      <div
        className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]"
        ref={scrolLRef}
      >
        {cartData.length === 0 ? (
          <p className="text-[#ababab] text-sm flex justify-center items-center h-[380px]">
            Your cart is empty. Start adding items!
          </p>
        ) : (
          cartData.map((item) => {
            if (item.quantity === 0) return null;
            return (
              <div
                key={item.id}
                // Save the ref for each item container using its id
                ref={(el) => (itemRefs.current[item.id] = el)}
                className="bg-[#1f1f1f] rounded-lg px-4 py-1 mb-2 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-[#fff] font-semibold tracling-wide text-md">
                    {item.name}
                  </h1>
                  <div className="text-[#ababab] font-semibold min-w-[150px] flex justify-between">
                    <span>{formatNumberWithSpaces(item.price)} UZS</span>
                    <span>x</span>
                    <span>{item.quantity} ta</span>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <RiDeleteBin2Fill
                      onClick={() => handleRemove(item.id)}
                      className="text-[#ababab] cursor-pointer"
                      size={20}
                    />
                    <FaNotesMedical
                      className="text-[#ababab] cursor-pointer"
                      size={20}
                    />
                  </div>
                  <p className="text-[#f5f5f5] text-md font-bold">
                    $ {item.price}
                  </p>
                </div> */}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
