function CardTitle({title} : {title: string}) {
    return ( 
        <h2 className="text-lg font-semibold text-foreground">{(title).charAt(0).toUpperCase() + (title).slice(1)}</h2>
     );
}

export default CardTitle;