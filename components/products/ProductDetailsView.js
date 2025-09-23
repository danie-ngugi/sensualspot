import { useState, useEffect, useContext } from 'react'

// import Link from 'next/link'
import Image from 'next/image'

import { useToasts } from 'react-toast-notifications'

import { imageHost, siteUrl, business } from 'common/data'
import { computePriceRange, makeImageUrl, toCurrency } from 'common/methods'

import { CartContext } from 'context/CartContext'
import { FavoriteContext } from 'context/FavoriteContext'



import { HeartFilledIcon, HeartOutline, ShareIcon, WhatsAppIcon } from 'components/icons'


const ProductDetailsView = ({ product }) => {

    const { addToBasket, basket } = useContext(CartContext)
    const { addItemToFavorites, removeFromFavorites, inFavorites } = useContext(FavoriteContext)
    const [ activeImage, setActiveImage ] = useState("")
    const [quantity, setQuantity] = useState(1)
    const canShare =  !!(typeof navigator !== 'undefined' && navigator?.share)


    
    const _color = (product?.colors && product.colors.length) >= 1 ? product.colors[0].name : null
    const prices = computePriceRange(product)
    const [ activeVariant, setVariant ] = useState(null)
    const [activeColor, setActiveColor] = useState(_color)
    const [activePrice, setActivePrice] = useState({ price: prices[0]})
    //  const [quantity, setQuantity] = useState(1)

    const { addToast } = useToasts()


    useEffect(() => {
        setActiveImage(product.mainImage)
        setQuantity(1)
        //  setActivePrice({ price: prices[0]})
        setActiveColor(
            (product.colors && product.colors.length) >= 1 ? product.colors[0].name : null
        )
        if (product.variants.length) {
            setVariant(product.variants[0])
            if (product.variants[0].priceEffect) {
                setActivePrice({ price: product.variants[0].price})
            } else {
                setActivePrice({ price: product.price });
            }
            
        } else {
            setVariant(null)
            setActivePrice({ price: product.price })
        }
    },[product?.url])


    const handleColorChange = (e) => {
        const color = e.target.value;
        setActiveColor(color)
    }

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value)|| 1
        setQuantity(value)
    }

    const updatePrice = (variant) => {
        if (variant.priceEffect) {
           setActivePrice({ price: variant.price })
        } else {
            setActivePrice({ price: product.price })
        }
        setVariant(variant)
    }

    const addToCart = () => {
        if (!product.availability) {
            addToast('Product out of stock', {
                appearance: 'error',
                autoDismiss: true,
            })
            return;
        }
        const id = activeVariant ? activeVariant._id : product._id
        //  console.log('activeColor', activeColor)
        const results = addToBasket({ variant: activeVariant, color: activeColor, price: activePrice, quantity, product, id: id })
        if (results.state) {
                addToast(results.msg, {
                appearance: 'success',
                autoDismiss: true,
            })
        } else {
            addToast(results.msg, {
                appearance: 'warning',
                autoDismiss: true,
              })
        }
    }

    const shareLink = async () => {
        try {
          const shareData = {
            title: `${product.name}`,
            text: `${product.name}`,
            url: `${siteUrl}/product/${product.url}`
          }
          await navigator?.share(shareData)
        } catch (err) {
          console.log('Share failed')
        }
    }

    const mutateFavorites = () => {
        // add to favorites
        if (inFavorites(product)) {
            removeFromFavorites(product)
        } else {
            addItemToFavorites(product)
        }
    }

    const whatsAppMessage = () => {
        const msg = `Hello, i'm interested in ${product.name} ${siteUrl}/product/${product.url}`
        const url = `https://api.whatsapp.com/send?phone=${business.whatsAppPhone}&text=${msg}`
    
        const win = window.open(url, '_blank')
        win.focus()
      }

    //  console.log('incoming product is', product)
    const sortFeatures = (a, b) => {
        const categoryA = a.category;
        const categoryB = b.category;
        if(categoryA < categoryB) { return -1; }
        if(categoryA > categoryB) { return 1; }
        return 0;
    }


 return (<div className="col-span-1 sm:col-span-3 order-1 sm:order-2 bg-white p-2 rounded-md flex flex-col gap-3 sm:flex-row">
 <div className="flex flex-col sm:w-1/3">
     <Image width={600} height={600} src={makeImageUrl(activeImage, '/products')} className="object-contain" />
     <div className="flex flex-row flex-wrap gap-2">
         <Image
             onClick={() => setActiveImage(product.mainImage)} 
             width={60}
             height={60}
            //  `${imageHost}/products/${product.mainImage}`
             src={makeImageUrl(product?.mainImage, '/products') }
             className="object-contain w-14 cursor-pointer border border-gray-300 rounded-lg" />
         {product.images.map((img) => {
             return <Image
              onClick={() => setActiveImage(img)} 
              src={makeImageUrl(img, '/offers')}
              key={img}
              width={60}
              height={60}
              className="object-contain w-14 cursor-pointer border border-gray-300 rounded-lg" />
         })}
     </div>
 </div>
 
 <div className="flex flex-col">
    <h1 className="font-semibold text-2xl primary-text sm:mt-1 mt-3 "> {product.name} </h1>

   
   

     {!activeVariant && <div className="mt-3">
         {prices.length > 1 ? `${toCurrency(prices[0])} - ${toCurrency(prices[1])}` : `${toCurrency(prices[0])}`}
     </div>}

     

     {activeVariant && <div className="mt-3"> {toCurrency(activePrice.price)} ({activeVariant && activeVariant.title})  </div>}

     <div className="mt-3 flex flex-row">
         
         {product && product.variants && product.variants.map((variant) => {
             return (
                 <div
                     key={variant.title}
                     onClick={() => updatePrice(variant)}
                     className={` m-1 p-1 rounded-md cursor-pointer 
                     ${ activeVariant && variant.title === activeVariant.title ? 'bg-secondary text-white' : 'border-gray-500 border'}`}>
                     {variant.title}
                 </div>
             )
         })}
     </div>

     {product?.flavors?.length >= 1 && <div className="mt-4 mb-1 flex flex-row flex-wrap">
         <label className="block text-left w-full">
             <span className="text-gray-700">Select flavor</span>
             <select className="form-select simple-input block w-full mt-1">
                 {product.flavors.map((flavor) => {
                     return (<option value={flavor} key={flavor}> { flavor} </option>)
                 })}
                
             </select>
         </label>
     </div>}

     <div className="mt-4 mb-2 flex flex-row flex-wrap">
         {product && product.colors && product.colors.map((color) => {
             return (
                 <label key={color._id} className="inline-flex items-center my-1.5 mx-2.5">
                     <input type="radio" onChange={handleColorChange} className="form-radio" name="color" value={color.name} checked={color.name === activeColor} />
                     <span className="ml-2"> { color.name } </span>
                 </label>
            
             )
         })}
     </div>

     <div className="mt-2">
         Availability: {product.availability ? <span>In Stock</span> : <span>Out of Stock</span>}
     </div>
     {product.brand && <div className="mt-2">
       Brand: {product.brand.name}
     </div>}

     <div className="mt-3 mb-3 flex flex-row select-none">

         <div className="sm:w-full w-28">
             <input
             className="simple-input"
             type="number"
             min={1}
             onChange={handleQuantityChange}
             value={quantity}
             placeholder="Quantity"/>                                                  
         </div>

     </div>

     <div className="mt-5 flex select-none items-center flex-row-reverse justify-around noselect ">
         <div
           onClick={ () => addToCart()} 
           className=" bg-[#00AB55] text-white px-3 py-2 cursor-pointer rounded-md">
             Add to basket 
         </div>

         <div>
             <span onClick={mutateFavorites} className="pointer text-red-500">
                 {inFavorites(product) ? <HeartFilledIcon /> : <HeartOutline /> }
                 
             </span>
         </div>

         <div>
             <span onClick={() => whatsAppMessage()} className="text-xl pointer">
                 <WhatsAppIcon style="width: 44px;" />
             </span>
         </div>
         {canShare && <div>
             
             <span className="pointer p-1" onClick={shareLink}> <ShareIcon /> </span>
             
         </div>}
     </div>
 </div>
</div>
)
}

export default ProductDetailsView
