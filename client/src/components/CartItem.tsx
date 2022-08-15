import { FC } from "react"
import CartItemType from "../types/CartItemType"

type CartItemProps = {
	item: CartItemType
}

const CartItem: FC<CartItemProps> = ( { item } : CartItemProps): JSX.Element => {
	const ingredientArray = JSON.parse(item.ingredients).map((ing: string) => JSON.stringify(ing))
	const finalIngredients = ingredientArray.join(", ").replaceAll('"', "")
	return (
		<>
			<div className="itemName">
				{
					`${ item.pizza } - ${item.pizzaPrice - item.ingredientsPrice} ₹`
				}
			</div>
			<div className="addons">
				{
					finalIngredients ? `${ finalIngredients } - ${item.ingredientsPrice} ₹` : `${item.ingredientsPrice} ₹`
				}
			</div>
			<div className="itemPrice">
				{ item.pizzaPrice } ₹
			</div>
		</>
	)
}

export default CartItem