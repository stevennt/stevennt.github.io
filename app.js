  // Set the configuration for your app
  // TODO: Replace with your project's config object
  //   var config = {
  //     apiKey: "AIzaSyA-4K0RxAzan8wI4QJi5xmIVJrJ2S1F7zE",
  //     authDomain: "abnasiatest.firebaseapp.com",
  //     databaseURL: "https://abnasiatest-default-rtdb.firebaseio.com",
  //     storageBucket: "abnasiatest.appspot.com"
  //   };
  //   firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  var school_data = database.ref('/schools_data')
  //   school_data.on('value', (snapshot) => {
  //       console.log(snapshot.val())
  //   })

  function lookup() {
      var school_id = document.getElementById('schoolID').value.trim()
      var student_id = document.getElementById('studentID').value.trim()
      var studentFound = false
      console.log(school_id, student_id)
      if (school_id.length > 0 && student_id.length > 0) {
          //if (grecaptcha.getResponse().length > 0) {

              school_data.orderByChild('school_id').equalTo(school_id).once('value', function (snapshot) {
              //school_data.orderByChild('school_id').toLowerCase().equalTo(school_id.toLowerCase()).once('value', function (snapshot) {
                  // console.log(snapshot.val())
                  school_records = snapshot.val()
                  if (school_records == null) {
                      alert('Mã trường : ' + school_id + ' không có, mời liên hệ với trường để cập nhật!')
                  } else {
                      students = school_records[school_id]['students']
                      // console.log(school_records)
                      for (i = 0; i < students.length; i++) {
                          if (students[i]['student_id'] === student_id) {
                          //if (students[i]['student_id'].value.toUpperCase() === student_id.value.toUpperCase() {
                            
                              console.log(students[i])
                              studentFound = true
                              document.getElementById('lf_school_id').innerText = school_records[school_id]['school_id']
                              document.getElementById('lf_school_name').innerText = school_records[school_id]['school_name']
                              document.getElementById('lf_student_id').innerText = students[i]['student_id']
                              document.getElementById('lf_student_name').innerText = students[i]['student_name']
                              //document.getElementById('lf_balance').innerText = students[i]['outstanding_balance']
                              //document.getElementById('lf_balance').innerText = students[i]['outstanding_balance'].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                              document.getElementById('lf_balance').innerText = students[i]['outstanding_balance'].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                              document.getElementById('lf_balance_date').innerText = school_records[school_id]['balance_date']                            

                              if (document.getElementById('balancediv').style.display = "none") {
                                  document.getElementById('balancediv').style.display = "block"
                              }
                          }
                          //   else {
                          //       alert('Student ID: ' + student_id + ' not found in this school, contact admin!')
                          //       document.getElementById('schoolID').value = ""
                          //       document.getElementById('studentID').value = ""
                          //       break
                          //   }
                      }
                      if (!studentFound) {
                          alert('Mã sinh viên : ' + student_id + ' không tìm thấy trong trường, mời liên hệ với trường để cập nhật!')
                      }
                  }
              })
          //} else {
          //    alert('Kiểm tra lại aptchaCheck the CAPTCHA!')
          //}
      } else {
          alert('Cả hai trường đều cần điền!')
      }
  }

  //   school_data.orderByValue().on("value", function (data) {

  //       data.forEach(function (data) {
  //           console.log("The " + data.key + " rating is " + data.val());
  //       });

  //   });

  //   school_data.orderByChild('school_id').on("value", (data) => {
  //       data.forEach(function (data) {
  //           console.log(data, data.val())
  //       })
  //   })

  //   rtdb_url = "https://abnasiatest-default-rtdb.firebaseio.com/abnasiatest-default-rtdb/schools_data.json"

  // //   fetch(rtdb_url).then(function (data) {
  // //       return data.json()
  // //   }).then(function (data) {
  // //       console.log(data)
  // //   })
