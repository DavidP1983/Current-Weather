import { ReactChild, ReactNode, useState } from "react";

export enum CardVariant {
    outlined = 'outlined',
    primary = 'primary'
}

interface ICardProps {
    width: string;
    height: string;
    children?: ReactChild | ReactNode;
    variant: CardVariant;
    onClick: (num: Number) => void;
}

const Card = ({ children, width, height, variant, onClick }: ICardProps) => {
    const [state, setState] = useState<Number>(10);
    return (
        <div style={{
            width, height,
            border: variant === CardVariant.outlined ? "1px solid gray" : "none",
            backgroundColor: variant === CardVariant.primary ? "red" : ""
        }} onClick={() => onClick(state)}>
            {children}
        </div>
    );
}

export default Card;