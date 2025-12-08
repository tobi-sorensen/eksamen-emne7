import AddToCartButton from "./AddToCartButton"

type Props = {
  id: string | number
  title: string
}

export default function AddToCartWrapper(props: Props) {
  return <AddToCartButton {...props} />
}