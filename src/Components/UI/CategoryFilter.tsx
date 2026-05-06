
type catProps ={
    categories: string[] ,
    selectedCategory: string ,
    onCategoryChange : (category : string) => void
}

export default function CategoryFilter({categories , selectedCategory , onCategoryChange}:catProps) {
  return (
//    catigory filter
  <select value={selectedCategory}
    onChange={(e)=>  onCategoryChange(e.target.value)}
    >
      <option value="all">All Categories</option>
      {
        categories?.map((cat)=>(
          <option key={cat.slug} value={cat.slug}>{cat.name}</option>
        ))
      }
    </select>
  )
}

