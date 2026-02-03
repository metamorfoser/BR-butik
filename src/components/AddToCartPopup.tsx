import "./AddToCartPopup.scss";

type Props = {
  title: string;
};

export function AddToCartPopup({ title }: Props) {
  return (
    <div className="popup">
      {title} lades i varukorgen
    </div>
  );
}
