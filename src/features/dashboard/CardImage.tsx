import Image from "next/image";

interface CardImagaeProp{
    img: string
}

function CardImage({img} : CardImagaeProp) {
    return ( 
        <Image
          src={img}
          alt="img"
          width={500}
          height={500}
          className="h-auto w-full rounded-xl object-contain"
        />
     );
}

export default CardImage;