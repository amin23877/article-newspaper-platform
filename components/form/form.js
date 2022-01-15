import React from 'react'
import { useForm } from "react-hook-form";


function recursiveMap(children, methods) {
    return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
            return child
        } else {

            if (child.props.children) {
                child = React.cloneElement(child, {
                    children: recursiveMap(child.props.children, methods)
                });
                return child;
            }

            return child.props.name
                ? React.createElement(child.type, {
                    ...{
                        ...child.props,
                        register: methods.register,
                        formState: methods.formState,
                        key: child.props.name
                    }
                })
                : child;
        }
    });
}

export default function Form({ defaultValues, children, onSubmit, ...rest }) {
    const methods = useForm({ defaultValues, mode: 'onChange' });
    const { handleSubmit } = methods;

    return (
        <form onSubmit={handleSubmit(onSubmit)} {...rest}>
            {recursiveMap(children, methods)}
        </form>
    );
}
