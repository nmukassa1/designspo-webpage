function CardTitle({title} : {title: string}) {
    return ( 
        <h2 className="font-bold">{(title).charAt(0).toUpperCase() + (title).slice(1)}</h2>
     );
}

export default CardTitle;