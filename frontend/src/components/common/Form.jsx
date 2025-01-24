import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

function CommonForm({ formContrls }) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    switch (getControlItem.componentType) {
      case "input":
        element = 
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
          />
          
        break;

        default :

        element = 
        <Input
          name={getControlItem.name}
          placeholder={getControlItem.placeholder}
          id={getControlItem.name}
          type={getControlItem.type}
        />
        break;
    }
    return element
  }

  return (
    <form>
      <div className="flex flex-col gap-3">
        {formContrls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
    </form>
  );
}

export default CommonForm;
