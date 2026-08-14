
 type props ={
    value: string ,
    onSearch : (value: string) => void
 }

 export const SearchInput = ({value , onSearch} : props)=>{
    return (
        <input
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search products.."
        className=" px-4 py-2 border w-125 rounded-3xl  focus:ring-1"
        />
    )
 }