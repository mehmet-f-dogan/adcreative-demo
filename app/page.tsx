"use client"

import Multiselect from "./components/multiselect";
import { useEffect, useState } from "react";
import { Character, getCharacters } from "rickmortyapi";
import { HighlightedText } from "./components/highlighted-text";

export default function Home() {
  const [term, setTerm] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([])

  async function search(term: string) {
    setLoading(true)
    setData([])
    const data = await getCharacters({
      name: term
    })
    if (data.status != 200) {
      setData([])
    } else {
      setData(data.data.results?.filter((result) => { return result.name.toLowerCase().includes(term.toLowerCase()) }) ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    search("")
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <Multiselect
        isObject={true}
        onKeyPressFn={function noRefCheck(data: any) { }}
        onRemove={function noRefCheck() { }}
        onSearch={function noRefCheck(data) {
          setTerm(data)
          search(data)
        }}
        onSelect={function noRefCheck() {
          setTerm("")
          search("")
        }}
        options={data}
        loading={isLoading}
        className="text-black"
        showCheckbox={true}
        keepSearchTerm={true}
        displayValue={"name"}

        optionValueDecorator={
          (v: string, option: Character) => {
            return (<div className="flex flex-row">
              <img className="h-16 rounded-md" src={option.image} />
              <div className="flex flex-col m-2 items-2">
                <HighlightedText highlight={term} text={option.name} />
                <h1>{
                  option.episode.length == 1 ? "1 Episode" : option.episode.length + " Episodes"
                }</h1>
              </div>
            </div>)
          }
        }
      />
    </main>
  );
}
