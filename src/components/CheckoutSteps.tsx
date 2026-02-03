import "./CheckoutSteps.scss";

type CheckoutStepsProps = {
  step: number;
};

export default function CheckoutSteps({ step }: CheckoutStepsProps) {
  return (
    <div
      className="checkout-steps"
      style={{ "--step": step } as React.CSSProperties}
    >

<div className={`step ${step >= 1 ? "done" : ""} ${step === 1 ? "active" : ""}`}>
  <span>Din varukorg</span>
</div>

<div className={`step ${step >= 2 ? "done" : ""} ${step === 2 ? "active" : ""}`}>
  <span>Kassa</span>
</div>

<div className={`step ${step >= 3 ? "done" : ""} ${step === 3 ? "active" : ""}`}>
  <span>Bekräftelse</span>
</div>

    </div>
  );
}
