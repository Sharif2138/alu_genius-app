                        WEATHER APP
                     Running it locally
I created a simple weather web app that provides users with the current weather conditions and air quality of th cities around the globe. I used only front end. I used HTML (index.html) to create the skeleton of the app, then CSS (styles.css) to style it and Javascript (script.js as a module to import a variable called WeatherApiKey from api_key.js that holds the Api key used to fetch data from Open weather map Api and display it in my app). I wrote the api_key.js in the .gitignore so that the file cannot be tracked by git and pushed to my public git account since it contains the api key. I used vs code as my code editor and I use liveserver to run it locally. It has a text box where i write the name of the city i want ti search for. It has search button that when clicked, weather data for that city is desplayed in my app. The dta includes temperature, current weather conditon and air quality metric from 1 to 5. With one signifying good and 5 signifying bad.

                     Deployment
I used a bash script (0-transfer_file) that automates the copying of files from my machine to the root directory of a web server. It takes in arguments like the path of the files, IP address of the server, username and path to ssh key. So I used it to upload my app files from my computer to the root directory of Web-01 and Web-02. Then i used the 'mv' command to mov all the files from the root directory to /var/www/html directory where the server finds the files it serves. My servers were connected to a load balancer which uses Haproxy. I configured it in frontend to litsen for unencrypted data on port 80 and then redirect it to port 443 using a 301 permanent redirect if the request made was not already secure. I did this to ensure secure connnections for all traffic. I set up an ssl certificate connection for encryption and decryption of the data through the load balancer. I alos configured it to use a roundrobin method to distribute the requests evenly among my two servers. I defind the two servers in the backend configuration. Additionally I added configurations to check on the health of the servers, add pages to be served incase of errors. I tested my load balancer if its working well with my web servers by running the curl command with grep( curl sI < IP address of server> | grep X-Served-By ) multiple times and it returned a http responses showing how the traffic is being sent to both servers one at ago for evry request.

                    Api used
I used th Open weather map Api which provides weather data for any location on the globe. I opted for  a free plan which only allows 60 calls per minute. After creating an account, it provided me with a unique Api key which I would use to authenticate my requests. This is the documentation https://openweathermap.org/current or https://openweathermap.org/api. 

                  Challenges faced
They were minor because thats what it takes. The whole process was so demanding. Especially deploying the files to the web servers from my machine and alot more. But all were minor issues.

                 



