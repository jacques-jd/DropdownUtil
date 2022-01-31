//SETTINGS
// dropdown.target = The class name you will apply to the dropdown objects
// dropdown.trigger = The class name you will apply to the item to click on, or the "Trigger" item.
// dropdown.unopened = On your trigger, you should have an indication whether the dropdown is open or not. This is it when it is closed
// dropdown.opened = This is the indication for when the dropdown is open.
// dropdown.hoverable = whether or not one can simply hover to trigger the expansion of the dropdown.

//Note: Each trigger item is associated with the following dropdown item. You need to have the same amount of Triggers and DropDowns.
let dropdown = {
    target: 'dropdown',
    trigger: 'droptrigger',
    opened: '\u25BE',
    unopened: '\u25B8',
    hoverable: true,
};


window.addEventListener("load", event =>
{
    let drops = []; //list of all dropdowns with trigger, state, and target

    for (let i = 0; i < document.querySelectorAll(`.${dropdown.target}`).length; i++)
    {
        if (!document.querySelectorAll(`.${dropdown.trigger}`)[i]) 
        {
            throw new Error(`Missing trigger for a dropdown.`);
        }

        drops.push({ trigger: document.querySelectorAll(`.${dropdown.trigger}`)[i], target: document.querySelectorAll(`.${dropdown.target}`)[i], open: false, hover: false });
    }

    for (let ddp of drops)
    {
        //this line adds the indicators. Modify if you want it in a different format.
        ddp.trigger.innerHTML = `${ddp.trigger.innerHTML} ${dropdown.unopened}`;
        ddp.trigger.style.cursor = "pointer";
        ddp.target.style.zIndex = "3";

        dropdown.open = dd =>
        {
            dd.target.style.visibility = "visible";
            dd.target.style.transform = 'scaleY(1)';
            dd.target.style.height = 'auto';

            dd.trigger.innerHTML = dd.trigger.innerHTML.replace(dropdown.unopened, dropdown.opened);

            dd.open = true;
        }

        dropdown.close = dd =>
        {
            dd.target.style.transform = 'scaleY(0)';

            setTimeout(dd=>{
                if(!dd.hover)
                {
                    dd.target.style.height = '0';
                    dd.target.style.visibility = "hidden";
                }
            }, 200, dd);
            
            dd.trigger.innerHTML = dd.trigger.innerHTML.replace(dropdown.opened, dropdown.unopened);

            dd.open = false;
        }

        dropdown.delayedClose = dd =>
        {
            setTimeout(() => 
            {
                if (!dd.hover) dropdown.close(dd);
                else dropdown.delayedClose(dd);
            }, 500);
        }

        dropdown.toggle = dd =>
        {
            if (dd.open) dropdown.close(dd); else dropdown.open(dd);
        }

        //this line hides them and makes them 0 height by default
        dropdown.close(ddp);
        ddp.target.style.position = "absolute";

        //prevents it from flashing when loading screen
        setTimeout(ddp => {
            ddp.target.style.transition = "transform 0.2s";
        }, 200, ddp);

        //this line adds the transition. comment out if you don't want transition.

        if (dropdown.hoverable) 
        {
            ddp.target.addEventListener("mouseleave", () => { ddp.hover = false; dropdown.delayedClose(ddp); });
            ddp.trigger.addEventListener("mouseleave", () => { ddp.hover = false; dropdown.delayedClose(ddp); });
            ddp.target.addEventListener("mouseenter", () => { ddp.hover = true; dropdown.open(ddp); });
            ddp.trigger.addEventListener("mouseenter", () => { ddp.hover = true; dropdown.open(ddp); });
        }
        else ddp.trigger.addEventListener("click", dropdown.toggle);
        
    }
});