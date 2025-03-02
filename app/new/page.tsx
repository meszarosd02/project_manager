import NewProjectPrompt from "../components/newproject";

export default function NewProject(){
    return (
        <>
            <div className="m-auto">
                <div className="w-fit">
                    <p className="text-2xl">You don't have an existing project yet</p>
                    <p className="text-md">Do you want to create one?</p>
                </div>
                <div className="w-fit my-12">
                    <NewProjectPrompt></NewProjectPrompt>
                </div>
            </div>
        </>
    );
}