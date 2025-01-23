on run argv
	set prevDelimiter to AppleScript's text item delimiters
	
	set AppleScript's text item delimiters to " "
	set commands to ""
	repeat with arg in argv
		set commands to commands & arg & " "
	end repeat
	set AppleScript's text item delimiters to prevDelimiter
	
	tell application "Ghostty"
		activate
		if current window is missing value then
			create window with default profile
		else
			tell current window
				create tab with default profile
			end tell
		end if
		tell current session of current tab of current window
			write text commands
		end tell
	end tell
end run