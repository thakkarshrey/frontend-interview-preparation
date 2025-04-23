import { CSSProperties, useState } from "react";
import { Option } from "../../types";
import { createPoll, removePoll } from "../../services/apiService";

type PollStyles = {
    container?: CSSProperties;
    title?: CSSProperties;
    optionsContainer?: CSSProperties;
    optionLabel?: CSSProperties;
    optionInput?: CSSProperties;
    optionVotes?: CSSProperties;
    progressBar?: CSSProperties;
    progressBarFill?: CSSProperties;
    removeButton?: CSSProperties;
}

type PollWidgetProps = {
    pollId: string;
    question: string;
    options: Option[];
    onVote: (pollId: string, selectedOptions: string[]) => Promise<Option[]>;
    onVoteRemove: (pollId: string, selectedOptions: string[]) => Promise<Option[]>;
    isMultiple?: boolean;
    styles?: PollStyles
}

const PollWidget = ({ question, styles, options, isMultiple, pollId }: PollWidgetProps) => {
    const [optionsData, setOptionsData] = useState<Option[]>(options)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const totalVotes = optionsData.reduce((acc, element) => acc + element.votes, 0)

    // useEffect(() => {
    //     const storedOptions = localStorage.getItem(`poll-${pollId}`)
    //     if (storedOptions) setSelectedOptions(JSON.parse(storedOptions))
    // }, [])

    const handleCreatePoll = async (id: string) => {
        let newSelectedOptions: string[]
        if (isMultiple) {
            if(selectedOptions.includes(id)){
                newSelectedOptions = selectedOptions.filter(e => e !== id)
                const response = await removePoll(pollId, [id])
                setOptionsData(response)
            }
            else {
                newSelectedOptions = [...selectedOptions, id]
                const response = await createPoll(pollId, [id])
                setOptionsData(response)
            }
        }
        else {
            if (selectedOptions.length > 0 && selectedOptions[0] !== id) {
                const response = await removePoll(pollId, selectedOptions)
                setOptionsData(response)
            }

            newSelectedOptions = [id]
            const response = await createPoll(pollId, newSelectedOptions)
            setOptionsData(response)
        }
        setSelectedOptions(newSelectedOptions)
        localStorage.setItem(`poll-${pollId}`, JSON.stringify(newSelectedOptions))
    }

    const handleRemovePoll = async() => {
        const response = await removePoll(pollId, selectedOptions)
        setSelectedOptions([])
        localStorage.removeItem(`poll-${pollId}`)
        setOptionsData(response)        
    }

    return (
        <fieldset className="rounded-md mx-auto max-w-md p-4 border border-gray-300" role="group" style={styles?.container} aria-labelledby={`poll-${pollId}-title`}>
            <legend id={`poll-${pollId}-title`} className="font-semibold text-lg" style={styles?.title}>{question}</legend>
            <div className="overflow-y-auto my-1" style={{
                ...styles?.optionsContainer,
                maxHeight: optionsData.length > 4 ? "200px" : "auto"
            }}>
                {
                    optionsData?.map((element) => {
                        const percentage = totalVotes > 0 ? (element.votes / totalVotes) * 100 : 0
                        return (
                            <div key={element.id} className="m-3">
                                <div className="flex justify-between items-center">
                                    <label htmlFor={`option-${element.id}`} style={styles?.optionLabel} className="flex items-center cursor-pointer">
                                        <input
                                            tabIndex={0}
                                            id={`option-${element.id}`}
                                            type={isMultiple ? "checkbox" : "radio"}
                                            style={styles?.optionInput}
                                            checked={selectedOptions.includes(element.id)}
                                            onChange={() => handleCreatePoll(element.id)}
                                            className="mr-1"
                                            onKeyDown={(e) => e.key === 'Enter' && handleCreatePoll(element.id)}
                                            aria-checked={selectedOptions.includes(element.id)}
                                            aria-describedby={`option-${element.id}-info`}
                                        />
                                        <span id={`option-${element.id}-info`}>{element.title}</span>
                                    </label>
                                    {
                                        selectedOptions.length > 0 &&
                                        <span>
                                            {element.votes} votes ({percentage.toFixed(2)}%)
                                        </span>
                                    }
                                </div>

                                {
                                    <div className="w-full bg-gray-300 rounded-full h-2" style={styles?.progressBar}>
                                        {
                                            selectedOptions.length > 0 &&
                                            <div className="h-full bg-blue-500 transform origin-left rounded-full" style={{
                                                ...styles?.progressBarFill,
                                                transform: `scaleX(${percentage / 100})`
                                            }}></div>
                                        }
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <button className="bg-red-500 py-2 px-5 text-white rounded w-fit cursor-pointer" onClick={handleRemovePoll}>Remove Vote</button>
        </fieldset>
    )
}

export default PollWidget