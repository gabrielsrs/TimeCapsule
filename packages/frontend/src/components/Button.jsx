export function Button({title, ...props }) {
    return (
        <button
            {...props}
        >{title}</button>
    )
}