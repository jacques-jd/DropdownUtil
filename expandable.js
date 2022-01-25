//SETTINGS
// dropdownClass = The class name you will apply to the dropdown objects
// triggerClass = The class name you will apply to the item to click on, or the "Trigger" item.
// unopened = On your trigger, you should have an indication whether the dropdown is open or not. This is it when it is closed
// opened = This is the indication for when the dropdown is open.
// hoverable = whether or not one can simply hover to trigger the expansion of the dropdown.

//Note: Each trigger item is associated with the following dropdown item. You need to have the same amount of Triggers and DropDowns.

let dropdownClass = 'drop',
    triggerClass = 'trig',
    unopened = '⮞',
    opened = '⮟',
    hoverable = true;


window.onload = event =>
{
    let drops = []; //list of all dropdowns with trigger, state, and target

    for (let i = 0; i < document.querySelectorAll(`.${dropdownClass}`).length; i++)
    {
        if (!document.querySelectorAll(`.${triggerClass}`)[i]) 
        {
            throw new Error(`Missing trigger for an expandable.`);
        }

        drops.push({ trigger: document.querySelectorAll(`.${triggerClass}`)[i], target: document.querySelectorAll(`.${dropdownClass}`)[i], open: false });
    }

    for (let dd of drops)
    {
        //this line adds the indicators. Modify if you want it in a different format.
        dd.trigger.innerHTML = `${dd.trigger.innerHTML} ${unopened}`;
        dd.trigger.style.cursor = "pointer";

        //this line hides them and makes them 0 height by default
        dd.target.style.opacity = "0";
        dd.target.style.height = "0";
        dd.target.style.position = "absolute";

        //set backgroundcolor if there is none already set
        if (getComputedStyle(dd.target).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)') dd.target.style.backgroundColor = "#FFF";

        //this line adds the transition. comment out if you don't want transition.
        dd.target.style.transition = "opacity 0.2s, transform 0.2s";

        let open = () =>
        {
            dd.target.style.transform = 'scaleY(1)';
            dd.target.style.opacity = '1';
            dd.target.style.height = 'auto';

            dd.trigger.innerHTML = dd.trigger.innerHTML.replace(unopened, opened);

            dd.open = true;
        }

        let close = () =>
        {
            dd.target.style.transform = 'scaleY(0)';
            dd.target.style.opacity = '0';
            dd.target.style.height = '0';

            dd.trigger.innerHTML = dd.trigger.innerHTML.replace(opened, unopened);

            dd.open = false;
        }

        let trigger = event =>
        {
            if (dd.open) close(); else open();
        }

        if (hoverable) 
        {
            dd.trigger.onmouseenter = open;
            dd.trigger.onmouseleave = close;
        }
        else dd.trigger.onclick = trigger;
    }
}