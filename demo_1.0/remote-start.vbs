Dim WshShell 
Set WshShell=WScript.CreateObject("WScript.Shell") 
WshShell.Run "cmd.exe"
WScript.Sleep 1500 
WshShell.SendKeys "ssh root@210.28.133.13 -p 21246 -L 3000:127.0.0.1:8080 -L 8000:127.0.0.1:8000"
WshShell.SendKeys "{ENTER}"
WScript.Sleep 5000 
WshShell.SendKeys "see2022"
WshShell.SendKeys "{ENTER}"
WScript.Sleep 1500 
WshShell.SendKeys "cd groupA/build"
WshShell.SendKeys "{ENTER}"
WScript.Sleep 100
WshShell.SendKeys "http-server"
WshShell.SendKeys "{ENTER}"