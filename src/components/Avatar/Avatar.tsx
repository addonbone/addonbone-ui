import React, {FC, memo, ReactNode} from "react";
import classnames from "classnames";
import {AvatarFallbackProps, AvatarImageProps, Fallback, Image, Root} from "@radix-ui/react-avatar";

import {useComponentProps} from "../../providers";

import styles from "./avatar.module.scss";

export enum AvatarSize {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export enum AvatarRadius {
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export interface AvatarProps extends AvatarImageProps, Pick<AvatarFallbackProps, "delayMs"> {
    imageClassName?: string;
    size?: AvatarSize;
    radius?: AvatarRadius;
    fallback?: ReactNode;
    fallbackClassName?: string;
    cursorPointer?: boolean;
}

const Avatar: FC<AvatarProps> = props => {
    const {
        size,
        radius,
        fallback,
        fallbackClassName,
        delayMs = 600,
        cursorPointer,
        imageClassName,
        className,
        ...other
    } = {...useComponentProps("avatar"), ...props};

    return (
        <Root
            className={classnames(
                styles["avatar"],
                {
                    [styles[`avatar--${size}-size`]]: size,
                    [styles[`avatar--${radius}-radius`]]: radius,
                    [styles[`avatar--cursor-pointer`]]: cursorPointer,
                },
                className
            )}
        >
            <Image className={classnames(styles["avatar-image"], imageClassName)} {...other} />
            {fallback && (
                <Fallback className={classnames(styles["avatar-fallback"], fallbackClassName)} delayMs={delayMs}>
                    {fallback}
                </Fallback>
            )}
        </Root>
    );
};

export default memo(Avatar);
