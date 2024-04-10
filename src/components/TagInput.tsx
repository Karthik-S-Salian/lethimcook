import { useState } from "react";

export default function TagInput({ tags,name }: { tags: string[],name:string }) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");

    function onInput(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value

        if (value.includes(",")) {
            const split = value.split(",")
            if (split.length > 0) {
                setSelectedTags(t => {
                    if (split[0] && !t.includes(split[0])) {
                        return [...t, split[0]]
                    }
                    return t
                })
            }
            setCurrentTag("")
        } else {
            setCurrentTag(value)
        }
    }

    return (
        <div className="border rounded-lg input-bordered p-0">
            <div className="min-h-12 w-full  p-4 border-b input-bordered flex gap-2 flex-wrap">
                {selectedTags.map(tag => {
                    return (
                        <span className="py-1 px-2 bg-primary/20 mx-1 flex rounded-md" key={tag}>{tag}
                            <button
                                className="ml-2 text-red-600"
                                onClick={() => setSelectedTags(ta => ta.filter(t => t != tag))}
                                type="button">X</button>
                        </span>
                    )
                })}
            </div>
            <input type="text" id={name} value={currentTag} onChange={onInput} className="input input-bordered w-full border-t-0" />

            <datalist id={name}>
                {tags.map(tag => <option value={tag} />)}
            </datalist>

            <input type="text" defaultValue={selectedTags.join(",")} hidden name={name} />
        </div>

    )
}