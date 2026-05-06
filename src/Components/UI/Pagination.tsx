
type props ={
  currentPage : number ,
  totalPages : number ,
  onPageChange : (page : number) => void
}
export default function Pagination({ currentPage, totalPages, onPageChange }: props) {
  return (
    <div>
      {Array.from({ length: totalPages } , (_ , i)=>{
        const page = i+1 

        return(<button key={page}
          onClick={()=> onPageChange(page)}
          className={`px-3 py-1 border rounded ${
              currentPage === page ? "bg-blue-500 text-white" : ""
            }`}

        > {page}
         </button>)
      })}
    </div>
  )
}
