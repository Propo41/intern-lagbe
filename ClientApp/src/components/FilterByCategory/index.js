import React from "react";
import {
  Button,
  Checkbox,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import {makeStyles} from "@material-ui/styles";

const FilterByCategory = (props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleCheckBoxClick = (event) => {
    const name = event.target.name;
    console.log(name);
    props.setCategories((prev) => {
      console.log(prev);
      // if selected name is already in the list, remove it
      if (prev.indexOf(name) !== -1) {
        prev.splice(prev.indexOf(name), 1);
        return [...prev];
      } else {
        return [...prev, name];
      }
    });
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const styles = makeStyles((theme) => ({
    checkBoxContainer: {
      justifyContent: "left !important",
      justifyItems: "left !important",
    },
  }));

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="filter-button"
      >
        {props.label}
        <KeyboardArrowDownIcon />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {props.categoryList.map((district, index) => {
                    return (
                      <MenuItem
                        key={index}
                        className={styles.checkBoxContainer}
                      >
                        <Checkbox
                          checked={
                            props.categories.indexOf(district) === -1
                              ? false
                              : true
                          }
                          inputProps={{ "aria-label": "primary checkbox" }}
                          size="small"
                          color="default"
                          name={district}
                          onChange={handleCheckBoxClick}
                        />
                        {district}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default FilterByCategory;
