
// Practice Section Smooth Interactive Handlers (Chuyển tab mượt mà, không cần bấm ẩn)
window.togglePracticeMindmap = function(tid, btn) {
    const card = document.getElementById('card-' + tid) || (btn ? btn.closest('.practice-topic-card') : null);
    if (!card) return;
    
    const mmDrawer = document.getElementById('mm-drawer-' + tid);
    const fuDrawer = document.getElementById('fu-drawer-' + tid);
    const mmBtn = btn || card.querySelector('.btn-mindmap-toggle');
    const fuBtn = card.querySelector('.btn-followups-toggle');

    if (!mmDrawer) return;

    const isCurrentlyOpen = mmDrawer.style.display !== 'none' && mmDrawer.style.display !== '';

    if (isCurrentlyOpen) {
        // Bấm lại chính nó -> Đóng lại
        mmDrawer.style.display = 'none';
        if (mmBtn) mmBtn.classList.remove('active-tab');
    } else {
        // Tự động đóng tab câu hỏi mở rộng nếu đang mở (không cần học viên bấm Ẩn thủ công)
        if (fuDrawer) {
            fuDrawer.style.display = 'none';
        }
        if (fuBtn) {
            fuBtn.classList.remove('active-tab');
        }

        // Mở mượt mà tab sơ đồ tư duy
        mmDrawer.style.display = 'block';
        if (mmBtn) mmBtn.classList.add('active-tab');
    }
};

window.togglePracticeFollowups = function(tid, btn) {
    const card = document.getElementById('card-' + tid) || (btn ? btn.closest('.practice-topic-card') : null);
    if (!card) return;
    
    const mmDrawer = document.getElementById('mm-drawer-' + tid);
    const fuDrawer = document.getElementById('fu-drawer-' + tid);
    const mmBtn = card.querySelector('.btn-mindmap-toggle');
    const fuBtn = btn || card.querySelector('.btn-followups-toggle');

    if (!fuDrawer) return;

    const isCurrentlyOpen = fuDrawer.style.display !== 'none' && fuDrawer.style.display !== '';

    if (isCurrentlyOpen) {
        // Bấm lại chính nó -> Đóng lại
        fuDrawer.style.display = 'none';
        if (fuBtn) fuBtn.classList.remove('active-tab');
    } else {
        // Tự động đóng tab sơ đồ tư duy nếu đang mở
        if (mmDrawer) {
            mmDrawer.style.display = 'none';
        }
        if (mmBtn) {
            mmBtn.classList.remove('active-tab');
        }

        // Mở mượt mà tab câu hỏi mở rộng
        fuDrawer.style.display = 'block';
        if (fuBtn) fuBtn.classList.add('active-tab');
    }
};

window.startSimWithTopic = function(tid) {
    // Navigate to simulator tab
    const simNav = document.querySelector('[data-target="tool-simulator"]');
    if (simNav) simNav.click();
    
    // Select topic in simulator dropdown
    setTimeout(() => {
        const select = document.getElementById('sim-topic-select');
        if (select) {
            select.value = tid;
            select.dispatchEvent(new Event('change'));
        }
        const simPane = document.getElementById('tool-simulator');
        if (simPane) simPane.scrollIntoView({ behavior: 'smooth' });
    }, 200);
};


window.copyCardSample = function(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const text = el.innerText;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Đã sao chép toàn bộ bài mẫu vào bộ nhớ tạm!');
        });
    } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Đã sao chép toàn bộ bài mẫu vào bộ nhớ tạm!');
    }
};

/**
 * VSTEP SPEAKING PART 03 - TOPIC DEVELOPMENT PORTAL
 * Interactive Engine: Speech Synthesis, Exam Simulator, Audio Recorder, Flashcards
 * Dedicated to Ms. Nguyet's Students
 */

// Master Topics Pool
const ALL_TOPICS_POOL = [
  {
    "id": "b-topic-01",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 01",
    "title": "Teamwork brings people many benefits.",
    "center": "Teamwork",
    "branches": [
      {
        "num": 1,
        "text": "Improve communication skills",
        "pos": "top",
        "type": "verb",
        "vi": "Cải thiện kỹ năng giao tiếp"
      },
      {
        "num": 2,
        "text": "Strengthen team relationships",
        "pos": "right",
        "type": "verb",
        "vi": "Thắt chặt mối quan hệ nhóm"
      },
      {
        "num": 3,
        "text": "Develop leadership qualities",
        "pos": "bottom",
        "type": "verb",
        "vi": "Phát triển phẩm chất lãnh đạo"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are some disadvantages of working in a team?",
        "vi": "Những bất lợi của việc làm việc nhóm là gì?",
        "a": "Teamwork also has some problems. Members may have <strong>different ideas and argue easily</strong>. Some lazy people may also <strong>let others do the work</strong>."
      },
      {
        "q": "In your opinion, how can companies encourage good teamwork?",
        "vi": "Theo bạn, các công ty có thể khuyến khích làm việc nhóm tốt bằng cách nào?",
        "a": "Companies can use simple ways. Managers should organize <strong>fun team activities every month</strong>. Giving bonuses for good teamwork <strong>also helps workers try harder</strong>."
      },
      {
        "q": "Do you think teamwork is more useful for young people or older people? Why?",
        "vi": "Bạn có nghĩ làm việc nhóm có ích hơn cho người trẻ hay người lớn tuổi?",
        "a": "I think it helps both groups. Young people can <strong>learn real experience from older workers</strong>. Older workers can also <strong>learn fresh ideas from young people</strong>."
      }
    ]
  },
  {
    "id": "b-topic-02",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 02",
    "title": "Soft skills are very important in modern society.",
    "center": "Soft skills",
    "branches": [
      {
        "num": 1,
        "text": "Create job opportunities",
        "pos": "top",
        "type": "verb",
        "vi": "Tạo cơ hội việc làm"
      },
      {
        "num": 2,
        "text": "Improve work performance",
        "pos": "right",
        "type": "verb",
        "vi": "Nâng cao hiệu suất công việc"
      },
      {
        "num": 3,
        "text": "Improve social relationships",
        "pos": "bottom",
        "type": "verb",
        "vi": "Cải thiện các mối quan hệ xã hội"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think soft skills are necessary today? Why or why not?",
        "vi": "Bạn có nghĩ kỹ năng mềm là cần thiết ngày nay không?",
        "a": "Yes, I think they are very necessary. Today, knowledge from books <strong>is not enough at work</strong>. Good soft skills help people <strong>work happily with others</strong>."
      },
      {
        "q": "Which soft skill do you think is the most important?",
        "vi": "Kỹ năng mềm nào quan trọng nhất?",
        "a": "I think communication is the most important skill. Talking clearly helps people <strong>avoid mistakes at work</strong>. It can also help teams <strong>finish tasks much faster</strong>."
      },
      {
        "q": "Do you think young people have better soft skills than older people?",
        "vi": "Người trẻ có kỹ năng mềm tốt hơn người lớn tuổi không?",
        "a": "I think both groups have strong points. Young people can <strong>learn new skills very fast</strong>. However, older people are often <strong>more calm and patient</strong>."
      }
    ]
  },
  {
    "id": "b-topic-03",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 03",
    "title": "Online learning is beneficial to students.",
    "center": "Online learning",
    "branches": [
      {
        "num": 1,
        "text": "Flexible",
        "pos": "top",
        "type": "adj",
        "vi": "Linh hoạt"
      },
      {
        "num": 2,
        "text": "Time-saving",
        "pos": "right",
        "type": "adj",
        "vi": "Tiết kiệm thời gian"
      },
      {
        "num": 3,
        "text": "Money-saving",
        "pos": "bottom",
        "type": "adj",
        "vi": "Tiết kiệm tiền bạc"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think online learning will replace traditional schools in the future?",
        "vi": "Học online có thay thế trường học truyền thống trong tương lai không?",
        "a": "No, I don't think so. Going to school helps students <strong>make real friends</strong>. Meeting teachers in person also <strong>helps students learn better</strong>."
      },
      {
        "q": "What are some disadvantages of online learning?",
        "vi": "Một số bất lợi của học trực tuyến là gì?",
        "a": "Online learning has two main problems. Students can easily <strong>lose focus because of phones</strong>. Looking at screens too long also <strong>hurts their eyes</strong>."
      },
      {
        "q": "How can students study online better?",
        "vi": "Làm thế nào để học sinh học trực tuyến tốt hơn?",
        "a": "Students should have good study habits. They should find a <strong>quiet place for study</strong>. Making a clear study plan also <strong>helps them focus better</strong>."
      }
    ]
  },
  {
    "id": "b-topic-04",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 04",
    "title": "Body language plays an important role in communication.",
    "center": "Body language",
    "branches": [
      {
        "num": 1,
        "text": "Overcome language barriers",
        "pos": "top",
        "type": "verb",
        "vi": "Vượt qua rào cản ngôn ngữ"
      },
      {
        "num": 2,
        "text": "Enhance mutual understanding",
        "pos": "right",
        "type": "verb",
        "vi": "Tăng cường sự hiểu biết lẫn nhau"
      },
      {
        "num": 3,
        "text": "Show emotions and attitudes",
        "pos": "bottom",
        "type": "verb",
        "vi": "Thể hiện cảm xúc và thái độ"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is body language important in presentations?",
        "vi": "Tại sao ngôn ngữ cơ thể quan trọng trong thuyết trình?",
        "a": "Body language makes a talk much better. Good eye contact and smiles <strong>keep listeners interested</strong>. It also makes speakers <strong>look confident on stage</strong>."
      },
      {
        "q": "Can body language cause misunderstandings in different cultures?",
        "vi": "Ngôn ngữ cơ thể có gây hiểu lầm giữa các nền văn hóa không?",
        "a": "Yes, I think it can. Some hand signs have <strong>different meanings in other countries</strong>. People should learn <strong>local customs before traveling abroad</strong>."
      },
      {
        "q": "How can people improve their body language?",
        "vi": "Làm thế nào để cải thiện ngôn ngữ cơ thể?",
        "a": "People can practice this every day. Standing before a mirror helps <strong>check your face and hands</strong>. Watching good speakers on videos <strong>is also very helpful</strong>."
      }
    ]
  },
  {
    "id": "b-topic-05",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 05",
    "title": "Studying abroad is very beneficial for young people.",
    "center": "Studying abroad",
    "branches": [
      {
        "num": 1,
        "text": "Develop themselves",
        "pos": "top",
        "type": "verb",
        "vi": "Phát triển bản thân"
      },
      {
        "num": 2,
        "text": "See the world",
        "pos": "right",
        "type": "verb",
        "vi": "Khám phá thế giới"
      },
      {
        "num": 3,
        "text": "Experience different styles of education",
        "pos": "bottom",
        "type": "verb",
        "vi": "Trải nghiệm các nền giáo dục khác nhau"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What difficulties do international students often face?",
        "vi": "Du học sinh thường gặp khó khăn gì?",
        "a": "They often face many difficulties at first. Many students feel <strong>lonely and miss home food</strong>. Speaking a foreign language daily <strong>is also hard initially</strong>."
      },
      {
        "q": "Should students do a part-time job while studying abroad?",
        "vi": "Du học sinh có nên đi làm thêm không?",
        "a": "Yes, I think they should try it. A part-time job brings <strong>extra money for living costs</strong>. It also helps students <strong>practice English with local people</strong>."
      },
      {
        "q": "Do you prefer studying abroad or studying in your home country?",
        "vi": "Bạn thích du học hay học trong nước?",
        "a": "I prefer studying in my home country. I can live <strong>close to my family and friends</strong>. It is also much cheaper <strong>than studying abroad</strong>."
      }
    ]
  },
  {
    "id": "b-topic-06",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 06",
    "title": "Learning English brings many benefits in different areas of life.",
    "center": "Learning English",
    "branches": [
      {
        "num": 1,
        "text": "Communication",
        "pos": "top",
        "type": "noun",
        "vi": "Giao tiếp"
      },
      {
        "num": 2,
        "text": "Career and job opportunities",
        "pos": "right",
        "type": "noun",
        "vi": "Cơ hội nghề nghiệp & việc làm"
      },
      {
        "num": 3,
        "text": "Academic purposes",
        "pos": "bottom",
        "type": "noun",
        "vi": "Mục đích học thuật"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "At what age should children start learning English?",
        "vi": "Trẻ em nên học tiếng Anh từ mấy tuổi?",
        "a": "Children can start around five years old. At this age, they can <strong>learn new sounds very fast</strong>. Fun songs and cartoons <strong>help them enjoy English early</strong>."
      },
      {
        "q": "What is the best way to practice speaking English?",
        "vi": "Cách tốt nhất để luyện nói tiếng Anh là gì?",
        "a": "The best way is speaking every day. Learners should talk <strong>with friends or English teachers</strong>. Watching English films also <strong>helps improve speaking skills</strong>."
      },
      {
        "q": "Is English the most useful language in the world?",
        "vi": "Tiếng Anh có phải là ngôn ngữ hữu ích nhất trên thế giới không?",
        "a": "Yes, I think it is. English is used widely <strong>in business and world travel</strong>. It helps people connect <strong>with friends around the world</strong>."
      }
    ]
  },
  {
    "id": "b-topic-07",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 07",
    "title": "Sending children to preschool early brings certain benefits.",
    "center": "Preschool early",
    "branches": [
      {
        "num": 1,
        "text": "Become more independent and sociable",
        "pos": "top",
        "type": "verb",
        "vi": "Trở nên tự lập và hòa đồng hơn"
      },
      {
        "num": 2,
        "text": "Better preparation for formal schooling",
        "pos": "right",
        "type": "noun",
        "vi": "Chuẩn bị tốt hơn cho việc học chính thức"
      },
      {
        "num": 3,
        "text": "Support parents in balancing work and family life",
        "pos": "bottom",
        "type": "verb",
        "vi": "Hỗ trợ cha mẹ cân bằng công việc và gia đình"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Are there any disadvantages of sending young children to school early?",
        "vi": "Có bất lợi gì khi cho trẻ nhỏ đi học sớm không?",
        "a": "Yes, there are some small problems. Little kids may feel <strong>scared when away from parents</strong>. They can also catch <strong>colds easily from other kids</strong>."
      },
      {
        "q": "What should parents look for when choosing a preschool?",
        "vi": "Phụ huynh nên chú ý điều gì khi chọn trường mầm non?",
        "a": "Parents should check the school carefully. A good school needs <strong>kind teachers and safe classrooms</strong>. Clean meals and playgrounds <strong>are also very important</strong>."
      },
      {
        "q": "Should preschool focus on study or playtime?",
        "vi": "Mầm non nên chú trọng việc học hay vui chơi?",
        "a": "I think preschool should focus on playtime. Young kids learn best <strong>through fun games and songs</strong>. Playing together also helps <strong>them make good friends</strong>."
      }
    ]
  },
  {
    "id": "b-topic-08",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 08",
    "title": "Good workplace relationships bring many benefits.",
    "center": "Good workplace relationships",
    "branches": [
      {
        "num": 1,
        "text": "Higher levels of job satisfaction",
        "pos": "top",
        "type": "noun",
        "vi": "Mức độ hài lòng công việc cao hơn"
      },
      {
        "num": 2,
        "text": "Higher levels of creativity",
        "pos": "right",
        "type": "noun",
        "vi": "Mức độ sáng tạo cao hơn"
      },
      {
        "num": 3,
        "text": "Higher levels of cooperation and teamwork",
        "pos": "bottom",
        "type": "noun",
        "vi": "Mức độ hợp tác và làm việc nhóm cao hơn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can coworkers solve problems with each other?",
        "vi": "Làm thế nào đồng nghiệp giải quyết vấn đề với nhau?",
        "a": "Coworkers should talk calmly together. Listening carefully helps them <strong>understand each other's ideas</strong>. If needed, they can <strong>ask a manager for advice</strong>."
      },
      {
        "q": "Is having close friends at work always good?",
        "vi": "Có bạn thân ở nơi làm việc có luôn tốt không?",
        "a": "It is mostly good for workers. Friendly coworkers help make <strong>daily work feel lighter</strong>. However, friends should still <strong>focus well during work hours</strong>."
      },
      {
        "q": "What can a company do to build a friendly workplace?",
        "vi": "Công ty có thể làm gì để xây dựng nơi làm việc thân thiện?",
        "a": "Companies can hold simple social events. Monthly team lunches help <strong>workers talk outside work</strong>. Celebrating birthdays together also <strong>makes the office warmer</strong>."
      }
    ]
  },
  {
    "id": "b-topic-09",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 09",
    "title": "Reading brings many benefits to people of all ages.",
    "center": "Reading",
    "branches": [
      {
        "num": 1,
        "text": "Relax",
        "pos": "top",
        "type": "verb",
        "vi": "Thư giãn"
      },
      {
        "num": 2,
        "text": "Widen knowledge",
        "pos": "right",
        "type": "verb",
        "vi": "Mở rộng kiến thức"
      },
      {
        "num": 3,
        "text": "Improve vocabulary",
        "pos": "bottom",
        "type": "verb",
        "vi": "Nâng cao vốn từ vựng"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you prefer paper books or e-books?",
        "vi": "Bạn thích sách giấy hay sách điện tử?",
        "a": "I prefer paper books to e-books. Holding a real book <strong>feels nice and hurts eyes less</strong>. Turning real pages also <strong>helps me focus better</strong>."
      },
      {
        "q": "How can parents encourage children to read more?",
        "vi": "Làm sao cha mẹ khuyến khích trẻ đọc sách nhiều hơn?",
        "a": "Parents should start with simple habits. They can read <strong>short bedtime stories with kids</strong>. Taking children to bookstores <strong>also makes them love books</strong>."
      },
      {
        "q": "Why do some people read less nowadays?",
        "vi": "Tại sao ngày nay một số người ít đọc sách?",
        "a": "People today have too many screens. Many people spend hours <strong>watching short videos on phones</strong>. This takes away their <strong>free time for reading</strong>."
      }
    ]
  },
  {
    "id": "b-topic-10",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 10",
    "title": "Artificial Intelligence brings many benefits to modern life.",
    "center": "Artificial Intelligence (AI)",
    "branches": [
      {
        "num": 1,
        "text": "Improve healthcare",
        "pos": "top",
        "type": "verb",
        "vi": "Cải thiện y tế và chăm sóc sức khỏe"
      },
      {
        "num": 2,
        "text": "Facilitate teaching and learning",
        "pos": "right",
        "type": "verb",
        "vi": "Hỗ trợ việc dạy và học"
      },
      {
        "num": 3,
        "text": "Handle daily tasks",
        "pos": "bottom",
        "type": "verb",
        "vi": "Xử lý các công việc hàng ngày"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Will AI take away people's jobs?",
        "vi": "AI có lấy mất việc làm của con người không?",
        "a": "AI may replace some simple jobs. For example, machines can do <strong>easy factory tasks quickly</strong>. However, AI also creates <strong>new computer and tech jobs</strong>."
      },
      {
        "q": "How do you use AI in your study or work?",
        "vi": "Bạn dùng AI trong học tập hay công việc như thế nào?",
        "a": "I often use AI to learn English. It helps me <strong>check grammar and translate hard words</strong>. This saves time and <strong>makes my study easier</strong>."
      },
      {
        "q": "What problems can AI bring?",
        "vi": "AI có thể mang lại những vấn đề gì?",
        "a": "AI can cause some serious problems. Private information may <strong>be stolen by bad people</strong>. Fake AI photos can also <strong>trick many online users</strong>."
      }
    ]
  },
  {
    "id": "b-topic-11",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 11",
    "title": "Maintaining work–life balance is important for everyone.",
    "center": "Work-life balance",
    "branches": [
      {
        "num": 1,
        "text": "Make time for hobbies",
        "pos": "top",
        "type": "verb",
        "vi": "Dành thời gian cho sở thích"
      },
      {
        "num": 2,
        "text": "Build personal relationships",
        "pos": "right",
        "type": "verb",
        "vi": "Xây dựng các mối quan hệ cá nhân"
      },
      {
        "num": 3,
        "text": "Have time to relax",
        "pos": "bottom",
        "type": "verb",
        "vi": "Có thời gian thư giãn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is work-life balance difficult in big cities?",
        "vi": "Tại sao cân bằng công việc và cuộc sống lại khó ở thành phố lớn?",
        "a": "City life makes balance very hard. People spend much time <strong>in heavy traffic jams daily</strong>. High living costs also force <strong>them to work overtime</strong>."
      },
      {
        "q": "What happens if someone works too much and never rests?",
        "vi": "Chuyện gì xảy ra nếu ai đó làm việc quá nhiều mà không nghỉ ngơi?",
        "a": "Working without rest harms health badly. People will soon <strong>feel stressed and get sick</strong>. They may also have <strong>less time for family</strong>."
      },
      {
        "q": "How can companies help workers balance work and life?",
        "vi": "Công ty có thể làm gì để giúp nhân viên cân bằng công việc và cuộc sống?",
        "a": "Companies can support workers in simple ways. Managers should avoid <strong>calling workers on weekends</strong>. Giving paid holidays also helps <strong>workers rest properly</strong>."
      }
    ]
  },
  {
    "id": "b-topic-12",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 12",
    "title": "Travelling brings many benefits to people’s lives.",
    "center": "Traveling",
    "branches": [
      {
        "num": 1,
        "text": "Explore different cultures",
        "pos": "top",
        "type": "verb",
        "vi": "Khám phá các nền văn hóa khác nhau"
      },
      {
        "num": 2,
        "text": "Make new friends",
        "pos": "right",
        "type": "verb",
        "vi": "Kết bạn mới"
      },
      {
        "num": 3,
        "text": "Reduce stress",
        "pos": "bottom",
        "type": "verb",
        "vi": "Giảm căng thẳng"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you prefer traveling alone or in a group?",
        "vi": "Bạn thích đi du lịch một mình hay theo nhóm?",
        "a": "I prefer traveling in a small group. With close friends, we can <strong>share costs and take photos</strong>. Everything becomes much <strong>more fun together</strong>."
      },
      {
        "q": "Is green tourism becoming more popular?",
        "vi": "Du lịch xanh có đang trở nên phổ biến hơn không?",
        "a": "Yes, green travel is very popular now. Many tourists want to <strong>protect nature during their trips</strong>. They try not to <strong>throw rubbish in parks</strong>."
      },
      {
        "q": "What should travelers prepare before visiting another country?",
        "vi": "Du khách nên chuẩn bị gì trước khi đến một đất nước khác?",
        "a": "Good preparation makes any trip smoother. Travelers should check <strong>passports and book hotels early</strong>. Learning some simple greetings <strong>is also very helpful</strong>."
      }
    ]
  },
  {
    "id": "b-topic-13",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 13",
    "title": "Doing charity work brings many personal benefits.",
    "center": "Charity work",
    "branches": [
      {
        "num": 1,
        "text": "Show gratitude and appreciation for life",
        "pos": "top",
        "type": "verb",
        "vi": "Thể hiện lòng biết ơn và trân trọng cuộc sống"
      },
      {
        "num": 2,
        "text": "Learn to take responsibility",
        "pos": "right",
        "type": "verb",
        "vi": "Học cách sống có trách nhiệm"
      },
      {
        "num": 3,
        "text": "Acquire useful skills",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tiếp thu các kỹ năng hữu ích"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Should schools make charity work a rule for students?",
        "vi": "Trường học có nên bắt buộc học sinh làm từ thiện không?",
        "a": "No, I don't think it should be a rule. Schools should encourage charity <strong>through fun student clubs</strong>. When students join freely, <strong>they feel much happier</strong>."
      },
      {
        "q": "How can people help poor people besides giving money?",
        "vi": "Mọi người có thể giúp người nghèo bằng cách nào ngoài việc cho tiền?",
        "a": "There are many simple ways to help. People can give away <strong>old clothes, books, and food</strong>. Teaching poor children to read <strong>is also very meaningful</strong>."
      },
      {
        "q": "Have you ever joined a charity activity?",
        "vi": "Bạn đã từng tham gia hoạt động từ thiện nào chưa?",
        "a": "Yes, I joined a school club last year. We gave <strong>warm clothes and books to kids</strong>. Seeing their happy smiles <strong>made me very proud</strong>."
      }
    ]
  },
  {
    "id": "b-topic-14",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 14",
    "title": "Spending holidays at home can be a good choice.",
    "center": "Holidays at home",
    "branches": [
      {
        "num": 1,
        "text": "Inexpensive",
        "pos": "top",
        "type": "adj",
        "vi": "Không tốn kém / Tiết kiệm"
      },
      {
        "num": 2,
        "text": "Relax",
        "pos": "right",
        "type": "verb",
        "vi": "Thư giãn"
      },
      {
        "num": 3,
        "text": "Safety",
        "pos": "bottom",
        "type": "noun",
        "vi": "An toàn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What fun things can people do when staying home on holidays?",
        "vi": "Mọi người có thể làm gì vui khi ở nhà vào kỳ nghỉ?",
        "a": "Staying home can still be very fun. Families can <strong>cook special meals together at home</strong>. Watching movies or playing board games <strong>is also very enjoyable</strong>."
      },
      {
        "q": "Why do some people not like staying at home on holidays?",
        "vi": "Tại sao một số người không thích ở nhà vào ngày lễ?",
        "a": "Some people find staying home boring. They want to visit <strong>new beaches or famous cities</strong>. Trying new local food also <strong>makes their holiday exciting</strong>."
      },
      {
        "q": "Is holiday traffic a big problem in your country?",
        "vi": "Giao thông ngày lễ có phải là vấn đề lớn ở nước bạn không?",
        "a": "Yes, holiday traffic is very heavy here. Millions of people travel <strong>back to their hometowns together</strong>. Roads and bus stations <strong>always get very crowded</strong>."
      }
    ]
  },
  {
    "id": "b-topic-15",
    "category": "benefits",
    "categoryName": "Nhóm Lợi Ích",
    "topicCode": "ĐỀ SỐ 15",
    "title": "Older leaders can be more effective in certain situations.",
    "center": "Older leaders",
    "branches": [
      {
        "num": 1,
        "text": "More experienced",
        "pos": "top",
        "type": "adj",
        "vi": "Giàu kinh nghiệm hơn"
      },
      {
        "num": 2,
        "text": "More knowledgeable",
        "pos": "right",
        "type": "adj",
        "vi": "Hiểu biết sâu rộng hơn"
      },
      {
        "num": 3,
        "text": "More responsible",
        "pos": "bottom",
        "type": "adj",
        "vi": "Có trách nhiệm hơn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What good points do young leaders have compared to older leaders?",
        "vi": "Lãnh đạo trẻ có ưu điểm gì so với lãnh đạo lớn tuổi?",
        "a": "Young leaders also have great strengths. They have lots of <strong>energy and know new technology</strong>. They often bring <strong>fresh ideas to the team</strong>."
      },
      {
        "q": "Should there be an age limit for leaders?",
        "vi": "Có nên có giới hạn độ tuổi cho lãnh đạo không?",
        "a": "Yes, I think an age limit helps. It gives young people <strong>chances to share modern ideas</strong>. Meanwhile, older people can still <strong>work as helpful advisors</strong>."
      },
      {
        "q": "What makes a good leader?",
        "vi": "Điều gì tạo nên một nhà lãnh đạo giỏi?",
        "a": "A good leader needs clear qualities. They must listen kindly and <strong>set a good example</strong>. Staying calm during hard times <strong>also builds team trust</strong>."
      }
    ]
  },
  {
    "id": "d-topic-01",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 01",
    "title": "There are some drawbacks of online shopping.",
    "center": "Online shopping",
    "branches": [
      {
        "num": 1,
        "text": "Delay in delivery",
        "pos": "top",
        "type": "noun",
        "vi": "Chậm trễ trong giao hàng"
      },
      {
        "num": 2,
        "text": "Lack of shopping experience",
        "pos": "right",
        "type": "noun",
        "vi": "Thiếu trải nghiệm mua sắm thực tế"
      },
      {
        "num": 3,
        "text": "Unexpected quality",
        "pos": "bottom",
        "type": "noun",
        "vi": "Chất lượng không như mong đợi"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can buyers stay safe when shopping online?",
        "vi": "Người mua làm gì để an toàn khi mua sắm online?",
        "a": "Buyers need to be very careful. They should choose <strong>trusted shops and good websites</strong>. Reading reviews from others also <strong>helps them avoid bad items</strong>."
      },
      {
        "q": "Will online stores completely replace real shops?",
        "vi": "Cửa hàng online có thay thế hoàn toàn cửa hàng thật không?",
        "a": "No, I don't think so. Many people love going out to <strong>try on clothes with friends</strong>. Real shopping gives a fun feeling <strong>that websites cannot bring</strong>."
      },
      {
        "q": "What should you do if an online order arrives broken?",
        "vi": "Bạn nên làm gì nếu đơn hàng online giao đến bị hỏng?",
        "a": "Buyers should act quickly right away. First, take clear <strong>photos of the broken item</strong>. Then message the shop to <strong>ask for your money back</strong>."
      }
    ]
  },
  {
    "id": "d-topic-02",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 02",
    "title": "There are some disadvantages of public transport.",
    "center": "Public transport",
    "branches": [
      {
        "num": 1,
        "text": "Take a lot of time",
        "pos": "top",
        "type": "verb",
        "vi": "Mất nhiều thời gian"
      },
      {
        "num": 2,
        "text": "Be very crowded",
        "pos": "right",
        "type": "verb",
        "vi": "Rất đông đúc"
      },
      {
        "num": 3,
        "text": "Be victims of criminal acts",
        "pos": "bottom",
        "type": "verb",
        "vi": "Có nguy cơ là nạn nhân của tội phạm"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can the government encourage more people to use buses?",
        "vi": "Chính phủ làm gì để khuyến khích nhiều người đi xe buýt hơn?",
        "a": "The government can improve bus quality. They should make <strong>bus tickets cheaper and buses cleaner</strong>. Adding more bus stops also <strong>helps people save time</strong>."
      },
      {
        "q": "Is public transport good for the environment?",
        "vi": "Phương tiện công cộng có tốt cho môi trường không?",
        "a": "Yes, I think it is very good. One bus can carry <strong>many people at one time</strong>. This can help <strong>reduce traffic jams and air pollution</strong>."
      },
      {
        "q": "Do you prefer going by motorbike or by bus?",
        "vi": "Bạn thích đi bằng xe máy hay xe buýt?",
        "a": "I prefer going by bus on rainy days. Taking a bus is <strong>safer and keeps me dry</strong>. However, on sunny days, <strong>a motorbike is much faster</strong>."
      }
    ]
  },
  {
    "id": "d-topic-03",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 03",
    "title": "There are some drawbacks of doing exercise.",
    "center": "Doing exercise",
    "branches": [
      {
        "num": 1,
        "text": "Waste time",
        "pos": "top",
        "type": "verb",
        "vi": "Lãng phí thời gian"
      },
      {
        "num": 2,
        "text": "Waste money",
        "pos": "right",
        "type": "verb",
        "vi": "Lãng phí tiền bạc"
      },
      {
        "num": 3,
        "text": "Get injured",
        "pos": "bottom",
        "type": "verb",
        "vi": "Bị chấn thương"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can people stay safe when doing exercise?",
        "vi": "Làm sao để an toàn khi tập thể dục?",
        "a": "People need to prepare well before exercising. They should <strong>warm up carefully for ten minutes</strong>. Wearing good sports shoes also <strong>helps protect their feet</strong>."
      },
      {
        "q": "Do people need an expensive gym to stay healthy?",
        "vi": "Mọi người có cần đến phòng gym đắt tiền để khỏe mạnh không?",
        "a": "No, I don't think so. People can <strong>walk in parks or exercise at home</strong>. Simple daily exercise is enough <strong>to keep the body healthy</strong>."
      },
      {
        "q": "How many hours of exercise per week is good for adults?",
        "vi": "Người lớn nên tập bao nhiêu giờ mỗi tuần?",
        "a": "About three hours a week is very good. Adults can do <strong>thirty minutes of easy exercise daily</strong>. This helps them stay fit <strong>without feeling too tired</strong>."
      }
    ]
  },
  {
    "id": "d-topic-04",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 04",
    "title": "There are some disadvantages of self-employment.",
    "center": "Self-employment",
    "branches": [
      {
        "num": 1,
        "text": "Financial burden",
        "pos": "top",
        "type": "noun",
        "vi": "Gánh nặng tài chính"
      },
      {
        "num": 2,
        "text": "Lack of benefits",
        "pos": "right",
        "type": "noun",
        "vi": "Thiếu các chế độ bảo hiểm, đãi ngộ"
      },
      {
        "num": 3,
        "text": "Increased responsibility",
        "pos": "bottom",
        "type": "noun",
        "vi": "Trách nhiệm nặng nề hơn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Should people start their own business even with these problems?",
        "vi": "Mọi người có nên tự mở kinh doanh dù có những vấn đề này không?",
        "a": "Yes, I think they should try. Working for yourself gives you <strong>freedom to choose your time</strong>. With hard work, people can <strong>build a successful business</strong>."
      },
      {
        "q": "Should students work for themselves or work for a company after school?",
        "vi": "Sinh viên ra trường nên tự kinh doanh hay đi làm công ty?",
        "a": "I think they should work for a company first. Young workers need to <strong>learn real skills and experience</strong>. Later, they can start <strong>their own business safely</strong>."
      },
      {
        "q": "What skills are most important for people who run their own business?",
        "vi": "Kỹ năng nào quan trọng nhất cho người tự kinh doanh?",
        "a": "Planning and speaking skills are very important. Owners need to <strong>manage money carefully every month</strong>. Talking politely with customers also <strong>helps them sell more</strong>."
      }
    ]
  },
  {
    "id": "d-topic-05",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 05",
    "title": "Living in an apartment has some disadvantages.",
    "center": "Living in an apartment",
    "branches": [
      {
        "num": 1,
        "text": "Pet restriction",
        "pos": "top",
        "type": "noun",
        "vi": "Bị hạn chế nuôi thú cưng"
      },
      {
        "num": 2,
        "text": "Limited spaces",
        "pos": "right",
        "type": "noun",
        "vi": "Không gian hạn chế"
      },
      {
        "num": 3,
        "text": "Noise from neighbors",
        "pos": "bottom",
        "type": "noun",
        "vi": "Tiếng ồn từ hàng xóm"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why do many young families still choose apartments?",
        "vi": "Tại sao nhiều gia đình trẻ vẫn chọn sống ở chung cư?",
        "a": "Apartments have many good points for young families. The prices are fair and <strong>buildings have good security</strong>. Shops and parks nearby are <strong>also very convenient</strong>."
      },
      {
        "q": "What can people do about noisy neighbors in an apartment?",
        "vi": "Mọi người có thể làm gì khi hàng xóm ở chung cư gây ồn?",
        "a": "People should stay polite when solving this. First, they can <strong>ask their neighbors to be quieter</strong>. If it continues, they can <strong>tell the building manager</strong>."
      },
      {
        "q": "Do you prefer living in a normal house or an apartment?",
        "vi": "Bạn thích sống ở nhà riêng bình thường hay căn hộ chung cư?",
        "a": "I prefer living in an apartment. It is usually <strong>very clean, safe, and modern</strong>. Higher floors also give <strong>fresh air and quiet views</strong>."
      }
    ]
  },
  {
    "id": "d-topic-06",
    "category": "drawbacks",
    "categoryName": "Nhóm Bất Lợi",
    "topicCode": "ĐỀ SỐ 06",
    "title": "Artificial Intelligence has certain drawbacks.",
    "center": "Drawbacks of AI",
    "branches": [
      {
        "num": 1,
        "text": "Over-reliance on AI in daily life",
        "pos": "top",
        "type": "noun",
        "vi": "Quá phụ thuộc vào AI trong cuộc sống"
      },
      {
        "num": 2,
        "text": "Job loss due to automation",
        "pos": "right",
        "type": "noun",
        "vi": "Mất việc làm do tự động hóa"
      },
      {
        "num": 3,
        "text": "The risk of receiving false or biased information",
        "pos": "bottom",
        "type": "noun",
        "vi": "Nguy cơ nhận thông tin sai lệch hoặc thiên vị"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can students avoid depending too much on AI?",
        "vi": "Làm sao học sinh tránh phụ thuộc quá nhiều vào AI?",
        "a": "Students should always try on their own first. They should <strong>write their own ideas before using AI</strong>. Teachers can also give <strong>more speaking tests in class</strong>."
      },
      {
        "q": "Can AI replace humans in art and writing?",
        "vi": "AI có thể thay thế con người trong nghệ thuật và viết lách không?",
        "a": "No, I don't think so. AI machines have <strong>no real feelings or life stories</strong>. Real art always comes <strong>from human hearts and minds</strong>."
      },
      {
        "q": "What should schools do when students use ChatGPT for homework?",
        "vi": "Trường học nên làm gì khi học sinh dùng ChatGPT làm bài tập về nhà?",
        "a": "Schools should guide students carefully. Teachers should show how to <strong>use AI as a helper</strong>. Students should do more <strong>writing tasks directly in class</strong>."
      }
    ]
  },
  {
    "id": "c-topic-01",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 01",
    "title": "There are several causes of youth violence.",
    "center": "Youth violence",
    "branches": [
      {
        "num": 1,
        "text": "Get media influence",
        "pos": "top",
        "type": "verb",
        "vi": "Chịu ảnh hưởng từ phim ảnh, truyền thông"
      },
      {
        "num": 2,
        "text": "Have peer pressure",
        "pos": "right",
        "type": "verb",
        "vi": "Chịu áp lực từ bạn bè"
      },
      {
        "num": 3,
        "text": "Lack of parental supervision",
        "pos": "bottom",
        "type": "noun",
        "vi": "Thiếu sự giám sát của cha mẹ"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can schools help prevent school violence?",
        "vi": "Trường học làm gì để ngăn bạo lực học đường?",
        "a": "Schools can do many useful things. Teachers should teach students to <strong>respect each other</strong>. Clear school rules and cameras can <strong>also stop fighting</strong>."
      },
      {
        "q": "Is online bullying among young people becoming worse?",
        "vi": "Bắt nạt trên mạng ở giới trẻ có đang tệ hơn không?",
        "a": "Yes, I think it is getting worse. People can easily <strong>hide their real names online</strong>. Mean comments can make teenagers <strong>feel very sad</strong>."
      },
      {
        "q": "What should parents do when teenagers are angry or act badly?",
        "vi": "Cha mẹ nên làm gì khi con cái nóng giận hoặc cư xử xấu?",
        "a": "Parents should stay calm and patient. They should <strong>talk with their children every day</strong>. Warm family love helps children <strong>control anger better</strong>."
      }
    ]
  },
  {
    "id": "c-topic-02",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 02",
    "title": "Parents are the best teachers.",
    "center": "Parents as teachers",
    "branches": [
      {
        "num": 1,
        "text": "Be closer to the children",
        "pos": "top",
        "type": "verb",
        "vi": "Gần gũi với con cái hơn"
      },
      {
        "num": 2,
        "text": "Teach them with love and responsibility",
        "pos": "right",
        "type": "verb",
        "vi": "Dạy dỗ con bằng tình thương và trách nhiệm"
      },
      {
        "num": 3,
        "text": "Understand the strengths and weaknesses",
        "pos": "bottom",
        "type": "verb",
        "vi": "Thấu hiểu điểm mạnh và điểm yếu của con"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What values should parents teach children first?",
        "vi": "Cha mẹ nên dạy con điều tốt đẹp nào đầu tiên?",
        "a": "Parents should teach basic good habits first. Children need to be <strong>honest and polite to everyone</strong>. These habits help them <strong>become good adults later</strong>."
      },
      {
        "q": "Can parents sometimes teach their children bad habits?",
        "vi": "Cha mẹ có thể vô tình dạy con thói quen xấu không?",
        "a": "Yes, I think they can. Children often copy <strong>what their parents do at home</strong>. Therefore, parents must <strong>set a good example</strong>."
      },
      {
        "q": "Who has a bigger influence on teenagers: parents or teachers?",
        "vi": "Cha mẹ hay thầy cô có ảnh hưởng lớn hơn đến thanh thiếu niên?",
        "a": "I think parents have a bigger influence. They live with teenagers and <strong>shape their daily habits</strong>. Teachers also help by <strong>teaching school knowledge</strong>."
      }
    ]
  },
  {
    "id": "c-topic-03",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 03",
    "title": "A lot of students have to suffer from school pressure.",
    "center": "School pressure",
    "branches": [
      {
        "num": 1,
        "text": "Parents’ expectation",
        "pos": "top",
        "type": "noun",
        "vi": "Kỳ vọng của cha mẹ"
      },
      {
        "num": 2,
        "text": "Peer competition",
        "pos": "right",
        "type": "noun",
        "vi": "Sự cạnh tranh từ bạn bè"
      },
      {
        "num": 3,
        "text": "Heavy workload",
        "pos": "bottom",
        "type": "noun",
        "vi": "Khối lượng bài vở nặng nề"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can schools reduce exam stress for students?",
        "vi": "Trường học làm sao giảm áp lực thi cử cho học sinh?",
        "a": "Schools can change how they test students. Teachers can give <strong>less homework every day</strong>. Fun group projects also help students <strong>enjoy learning more</strong>."
      },
      {
        "q": "What should parents do when their child gets low marks?",
        "vi": "Cha mẹ nên làm gì khi con bị điểm thấp?",
        "a": "Parents should stay calm and kind. They should help their child <strong>check mistakes and improve</strong>. Warm support makes children <strong>confident to try again</strong>."
      },
      {
        "q": "Can playing sports help students reduce study stress?",
        "vi": "Chơi thể thao có giúp học sinh giảm căng thẳng học tập không?",
        "a": "Yes, playing sports helps a lot. Exercise helps students <strong>forget stress and feel happy</strong>. It also helps them <strong>sleep better at night</strong>."
      }
    ]
  },
  {
    "id": "c-topic-04",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 04",
    "title": "Women are encouraged to become leaders.",
    "center": "Women leaders",
    "branches": [
      {
        "num": 1,
        "text": "Good communication skills",
        "pos": "top",
        "type": "noun",
        "vi": "Kỹ năng giao tiếp tốt"
      },
      {
        "num": 2,
        "text": "Effective teamwork skills",
        "pos": "right",
        "type": "noun",
        "vi": "Kỹ năng làm việc nhóm hiệu quả"
      },
      {
        "num": 3,
        "text": "The ability to multitask",
        "pos": "bottom",
        "type": "noun",
        "vi": "Khả năng xử lý nhiều việc cùng lúc"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do men and women lead in different ways?",
        "vi": "Nam và nữ lãnh đạo theo những cách khác nhau phải không?",
        "a": "Yes, I think they lead differently. Women often listen carefully and <strong>care about teamwork</strong>. Men are sometimes faster when <strong>making big decisions</strong>."
      },
      {
        "q": "What is the biggest difficulty for women who want to become top leaders?",
        "vi": "Khó khăn lớn nhất của phụ nữ khi muốn lên vị trí lãnh đạo cao là gì?",
        "a": "The biggest difficulty is balancing family and work. Women often have to <strong>do heavy housework at home</strong>. This leaves them <strong>less time for company work</strong>."
      },
      {
        "q": "How can companies help women have equal chances at work?",
        "vi": "Công ty có thể làm gì để giúp phụ nữ có cơ hội bình đẳng nơi làm việc?",
        "a": "Companies should treat men and women fairly. They should offer <strong>equal pay and fair promotions</strong>. Good rest time for mothers <strong>also helps a lot</strong>."
      }
    ]
  },
  {
    "id": "c-topic-05",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 05",
    "title": "There are some factors causing stress in modern life.",
    "center": "Causes of stress",
    "branches": [
      {
        "num": 1,
        "text": "Study/Work burnout",
        "pos": "top",
        "type": "noun",
        "vi": "Kiệt sức do học tập hoặc công việc"
      },
      {
        "num": 2,
        "text": "Poor financial situation",
        "pos": "right",
        "type": "noun",
        "vi": "Tình hình tài chính khó khăn"
      },
      {
        "num": 3,
        "text": "Relationship problems",
        "pos": "bottom",
        "type": "noun",
        "vi": "Vấn đề trong các mối quan hệ"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "What are common signs of too much stress?",
        "vi": "Những dấu hiệu thường gặp khi bị quá căng thẳng là gì?",
        "a": "Stress shows clear signs on health. People may get <strong>headaches and sleep badly</strong>. They can also <strong>get angry very quickly</strong>."
      },
      {
        "q": "Can talking to a friend help reduce stress?",
        "vi": "Nói chuyện với bạn bè có giúp giảm căng thẳng không?",
        "a": "Yes, talking with friends helps a lot. Sharing bad feelings makes <strong>people feel much lighter</strong>. Friends can also <strong>give some helpful advice</strong>."
      },
      {
        "q": "When should someone talk to a doctor about stress?",
        "vi": "Khi nào ai đó nên gặp bác sĩ về stress?",
        "a": "They should see a doctor when stress lasts too long. If stress <strong>stops them from working or sleeping</strong>, they need help. Doctors can give them <strong>safe ways to feel better</strong>."
      }
    ]
  },
  {
    "id": "c-topic-06",
    "category": "causes",
    "categoryName": "Nhóm Nguyên Nhân / Lý Do",
    "topicCode": "ĐỀ SỐ 06",
    "title": "Childhood obesity is caused by several factors.",
    "center": "Childhood obesity",
    "branches": [
      {
        "num": 1,
        "text": "Unhealthy eating habits",
        "pos": "top",
        "type": "noun",
        "vi": "Thói quen ăn uống không lành mạnh"
      },
      {
        "num": 2,
        "text": "Excessive mobile phone use",
        "pos": "right",
        "type": "noun",
        "vi": "Sử dụng điện thoại quá nhiều"
      },
      {
        "num": 3,
        "text": "Lack of physical exercise",
        "pos": "bottom",
        "type": "noun",
        "vi": "Thiếu vận động thể chất"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Should schools stop selling sweet drinks and fast food in canteens?",
        "vi": "Trường học có nên ngừng bán nước ngọt và đồ ăn nhanh ở căng tin không?",
        "a": "Yes, I think schools should stop. Sweet drinks and fried food <strong>harm children's health</strong>. School canteens should <strong>sell fresh fruit and milk</strong>."
      },
      {
        "q": "What health problems can overweight children face later in life?",
        "vi": "Trẻ thừa cân có thể gặp vấn đề sức khỏe gì sau này?",
        "a": "Overweight children face serious health risks. They may get <strong>heart problems when they grow up</strong>. They may also feel <strong>shy around their classmates</strong>."
      },
      {
        "q": "How can families help children stay active together?",
        "vi": "Gia đình làm sao để giúp trẻ cùng vận động năng động?",
        "a": "Families can enjoy sports together. Parents can take kids <strong>cycling or walking on weekends</strong>. Cooking healthy meals at home <strong>also helps a lot</strong>."
      }
    ]
  },
  {
    "id": "w-topic-01",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 01",
    "title": "There are several ways to overcome sadness.",
    "center": "Overcome sadness",
    "branches": [
      {
        "num": 1,
        "text": "Share with someone else",
        "pos": "top",
        "type": "verb",
        "vi": "Tâm sự với người khác"
      },
      {
        "num": 2,
        "text": "Listen to music",
        "pos": "right",
        "type": "verb",
        "vi": "Nghe nhạc"
      },
      {
        "num": 3,
        "text": "Do exercise",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tập thể dục"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Is crying a good way to feel better when sad?",
        "vi": "Khóc có phải là cách tốt để thấy dễ chịu hơn khi buồn không?",
        "a": "Yes, I think so. Crying is a <strong>natural way to let out bad feelings</strong>. After crying, people often <strong>feel much calmer</strong>."
      },
      {
        "q": "What should you do when a friend feels very sad?",
        "vi": "Bạn nên làm gì khi bạn bè cảm thấy rất buồn?",
        "a": "I should stay with them and listen carefully. I can <strong>say kind words to cheer them up</strong>. We can also <strong>go for a nice walk together</strong>."
      },
      {
        "q": "Can going out in nature help people feel happier?",
        "vi": "Ra ngoài hòa mình vào thiên nhiên có giúp mọi người vui hơn không?",
        "a": "Yes, I think it helps a lot. Green parks help people <strong>relax and forget worries</strong>. Fresh air also makes them <strong>feel peaceful and happy</strong>."
      }
    ]
  },
  {
    "id": "w-topic-02",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 02",
    "title": "There are ways to maintain good workplace relationships.",
    "center": "Workplace relationships",
    "branches": [
      {
        "num": 1,
        "text": "Build effective communication skills",
        "pos": "top",
        "type": "verb",
        "vi": "Xây dựng kỹ năng giao tiếp hiệu quả"
      },
      {
        "num": 2,
        "text": "Keep good co-operation",
        "pos": "right",
        "type": "verb",
        "vi": "Duy trì sự hợp tác tốt"
      },
      {
        "num": 3,
        "text": "Avoid criticism and gossip",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tránh chỉ trích và bàn tán"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is office gossip bad for a team?",
        "vi": "Tại sao chuyện bàn tán ở văn phòng lại có hại cho nhóm?",
        "a": "Office gossip is bad for teamwork. It breaks trust and <strong>hurts coworkers' feelings</strong>. It can also cause <strong>useless arguments at work</strong>."
      },
      {
        "q": "How can quiet workers make friends at the office?",
        "vi": "Người ít nói làm thế nào để kết bạn ở văn phòng?",
        "a": "They should start with small friendly actions. Quiet workers can <strong>smile and chat during lunch breaks</strong>. Helping teammates with small tasks also <strong>makes friends easily</strong>."
      },
      {
        "q": "Should managers hang out with workers after work?",
        "vi": "Quản lý có nên đi ăn uống với nhân viên sau giờ làm không?",
        "a": "Yes, I think they should sometimes. Team dinners help managers and workers <strong>understand each other better</strong>. However, everyone should still <strong>respect rules at work</strong>."
      }
    ]
  },
  {
    "id": "w-topic-03",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 03",
    "title": "People should do a few things to have a successful interview.",
    "center": "A successful interview",
    "branches": [
      {
        "num": 1,
        "text": "Being punctual",
        "pos": "top",
        "type": "noun",
        "vi": "Đúng giờ"
      },
      {
        "num": 2,
        "text": "Being well-dressed",
        "pos": "right",
        "type": "noun",
        "vi": "Ăn mặc lịch sự, chỉn chu"
      },
      {
        "num": 3,
        "text": "Being humorous",
        "pos": "bottom",
        "type": "noun",
        "vi": "Hài hước, tự nhiên"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Do you think first impressions are important in job interviews?",
        "vi": "Bạn có nghĩ ấn tượng ban đầu quan trọng trong phỏng vấn xin việc không?",
        "a": "Yes, I think they are important. Interviewers often form opinions about candidates in the first few minutes. Therefore, a good first impression may increase candidates’ chances of getting the job."
      },
      {
        "q": "Which do you think is more important in an interview: appearance or personality?",
        "vi": "Theo bạn điều gì quan trọng hơn trong phỏng vấn: ngoại hình hay tính cách?",
        "a": "I think both are important, but personality is more important. A good personality helps candidates communicate well with the interviewer. It can also help them build a good relationship with other people at work."
      },
      {
        "q": "What can people do if they make a bad first impression in an interview?",
        "vi": "Mọi người có thể làm gì nếu lỡ tạo ấn tượng ban đầu không tốt trong phỏng vấn?",
        "a": "They should stay calm and continue the interview confidently. They can give clear answers and show their skills. This may help change the interviewer's opinion."
      }
    ]
  },
  {
    "id": "w-topic-04",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 04",
    "title": "There are some simple ways to stay healthy.",
    "center": "Stay healthy",
    "branches": [
      {
        "num": 1,
        "text": "Do exercise",
        "pos": "top",
        "type": "verb",
        "vi": "Tập thể dục"
      },
      {
        "num": 2,
        "text": "Manage stress",
        "pos": "right",
        "type": "verb",
        "vi": "Kiểm soát căng thẳng"
      },
      {
        "num": 3,
        "text": "Eat healthy food",
        "pos": "bottom",
        "type": "verb",
        "vi": "Ăn uống lành mạnh"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is drinking enough water every day important?",
        "vi": "Tại sao uống đủ nước mỗi ngày lại quan trọng?",
        "a": "Drinking enough water is very important for health. Water helps <strong>keep the body clean and fresh</strong>. It also stops people from <strong>feeling tired quickly</strong>."
      },
      {
        "q": "How many hours of sleep do adults need every night?",
        "vi": "Người lớn cần ngủ bao nhiêu tiếng mỗi đêm?",
        "a": "Adults usually need <strong>seven to eight hours of sleep</strong>. Good sleep helps the <strong>body rest after work</strong>. It also keeps the mind <strong>fresh the next morning</strong>."
      },
      {
        "q": "Is mental health as important as physical health?",
        "vi": "Sức khỏe tinh thần có quan trọng bằng sức khỏe thể chất không?",
        "a": "Yes, I think both are equally important. A happy mind helps people <strong>work well every day</strong>. It also helps them <strong>stay strong and avoid sickness</strong>."
      }
    ]
  },
  {
    "id": "w-topic-05",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 05",
    "title": "There are effective ways to manage stress in daily life.",
    "center": "Manage stress",
    "branches": [
      {
        "num": 1,
        "text": "Do physical exercise",
        "pos": "top",
        "type": "verb",
        "vi": "Tập luyện thể chất"
      },
      {
        "num": 2,
        "text": "Talk to someone",
        "pos": "right",
        "type": "verb",
        "vi": "Tâm sự với ai đó"
      },
      {
        "num": 3,
        "text": "Take a short break",
        "pos": "bottom",
        "type": "verb",
        "vi": "Nghỉ ngơi ngắn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Does sitting quietly or resting help reduce worry?",
        "vi": "Ngồi yên tĩnh hoặc nghỉ ngơi có giúp giảm lo âu không?",
        "a": "Yes, I think it works well. Sitting quietly helps <strong>calm a busy mind</strong>. Just ten minutes a day can <strong>make people feel peaceful</strong>."
      },
      {
        "q": "Can listening to soft music help people relax?",
        "vi": "Nghe nhạc nhẹ có giúp mọi người thư giãn không?",
        "a": "Yes, soft music is very helpful. Slow songs help the <strong>body and mind slow down</strong>. It can easily <strong>reduce daily tiredness after work</strong>."
      },
      {
        "q": "Why is taking short breaks at work important?",
        "vi": "Tại sao nghỉ giải lao ngắn khi làm việc lại quan trọng?",
        "a": "Short breaks are necessary during busy days. They let the brain <strong>rest for a few minutes</strong>. Workers can then return and <strong>work much better</strong>."
      }
    ]
  },
  {
    "id": "w-topic-06",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 06",
    "title": "There are some good ways to save money as a student.",
    "center": "Save money",
    "branches": [
      {
        "num": 1,
        "text": "Prepare meals at home",
        "pos": "top",
        "type": "verb",
        "vi": "Tự nấu ăn tại nhà"
      },
      {
        "num": 2,
        "text": "Avoid unnecessary shopping",
        "pos": "right",
        "type": "verb",
        "vi": "Tránh mua sắm không cần thiết"
      },
      {
        "num": 3,
        "text": "Set a monthly budget",
        "pos": "bottom",
        "type": "verb",
        "vi": "Lập ngân sách chi tiêu hàng tháng"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why do you think saving money is important for students?",
        "vi": "Tại sao bạn nghĩ việc tiết kiệm tiền lại quan trọng đối với sinh viên?",
        "a": "Saving money is important because students often have a limited budget. They can use their savings to pay for books or other necessary things. It can also help them prepare for unexpected problems."
      },
      {
        "q": "Which way of saving money do you think is the most effective for students?",
        "vi": "Cách tiết kiệm tiền nào bạn nghĩ là hiệu quả nhất đối với sinh viên?",
        "a": "I think setting a monthly budget is the most effective way. Students can plan how much money they can spend each month. As a result, they can control their spending and save more money."
      },
      {
        "q": "What difficulties do students often face when trying to save money?",
        "vi": "Sinh viên thường gặp khó khăn gì khi cố gắng tiết kiệm tiền?",
        "a": "Students may find it difficult to save money because they have limited income. They may also want to buy clothes or eat out with their friends. As a result, they may spend too much money and have little left to save."
      }
    ]
  },
  {
    "id": "w-topic-07",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 07",
    "title": "There are different ways to improve the school library.",
    "center": "Improve the school library",
    "branches": [
      {
        "num": 1,
        "text": "Add more useful books and resources",
        "pos": "top",
        "type": "verb",
        "vi": "Bổ sung thêm sách và tài liệu hữu ích"
      },
      {
        "num": 2,
        "text": "Provide digital materials and computers",
        "pos": "right",
        "type": "verb",
        "vi": "Cung cấp tài liệu số và máy tính"
      },
      {
        "num": 3,
        "text": "Create a more comfortable reading space",
        "pos": "bottom",
        "type": "verb",
        "vi": "Tạo không gian đọc sách thoải mái hơn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can libraries attract more students to visit?",
        "vi": "Thư viện làm thế nào để thu hút nhiều học sinh đến hơn?",
        "a": "Libraries should make the room nicer. They can provide <strong>comfortable chairs, fast Wi-Fi, and new books</strong>. A quiet place will always <strong>bring more students in</strong>."
      },
      {
        "q": "Are real libraries still needed today?",
        "vi": "Thư viện thật ngày nay có còn cần thiết không?",
        "a": "Yes, real libraries are still needed. They give students a <strong>quiet place to study</strong>. Studying near hard-working friends also <strong>helps students focus better</strong>."
      },
      {
        "q": "Should food and drinks be allowed in school libraries?",
        "vi": "Có nên cho mang đồ ăn thức uống vào thư viện trường không?",
        "a": "No, I don't think so. Food and sweet drinks can <strong>make books and tables dirty</strong>. Students should eat outside <strong>before entering the library</strong>."
      }
    ]
  },
  {
    "id": "w-topic-08",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 08",
    "title": "There are different ways to learn history effectively.",
    "center": "Learn history",
    "branches": [
      {
        "num": 1,
        "text": "Reading more history books",
        "pos": "top",
        "type": "verb",
        "vi": "Đọc thêm sách lịch sử"
      },
      {
        "num": 2,
        "text": "Listen to historical stories",
        "pos": "right",
        "type": "verb",
        "vi": "Lắng nghe các câu chuyện lịch sử"
      },
      {
        "num": 3,
        "text": "Watch historical documentaries or films",
        "pos": "bottom",
        "type": "verb",
        "vi": "Xem phim tài liệu hoặc phim lịch sử"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why do some students find history boring?",
        "vi": "Tại sao một số học sinh thấy môn lịch sử nhàm chán?",
        "a": "Because they have to learn too much by heart. Remembering <strong>long lists of dates and names</strong> is hard. Without fun stories, history feels <strong>dry and boring</strong>."
      },
      {
        "q": "How can visiting museums make history more fun?",
        "vi": "Đi tham quan bảo tàng giúp học lịch sử vui hơn thế nào?",
        "a": "Museums make history feel very real. Students can see <strong>old tools, clothes, and photos</strong> directly. This helps them <strong>remember lessons better than reading books</strong>."
      },
      {
        "q": "Why is learning history important for people?",
        "vi": "Tại sao học lịch sử quan trọng đối với mọi người?",
        "a": "Learning history is very meaningful. It helps people <strong>understand their country's culture and past</strong>. It also teaches useful <strong>lessons for the future</strong>."
      }
    ]
  },
  {
    "id": "w-topic-09",
    "category": "ways",
    "categoryName": "Nhóm Cách Thức / Phương Pháp",
    "topicCode": "ĐỀ SỐ 09",
    "title": "People use different ways to keep in touch with others.",
    "center": "Keep in touch",
    "branches": [
      {
        "num": 1,
        "text": "Make phone calls",
        "pos": "top",
        "type": "verb",
        "vi": "Gọi điện thoại"
      },
      {
        "num": 2,
        "text": "Meet in person",
        "pos": "right",
        "type": "verb",
        "vi": "Gặp mặt trực tiếp"
      },
      {
        "num": 3,
        "text": "Write letters or messages",
        "pos": "bottom",
        "type": "verb",
        "vi": "Viết thư hoặc gửi tin nhắn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How has social media changed the way we stay in touch?",
        "vi": "Mạng xã hội đã thay đổi cách chúng ta giữ liên lạc thế nào?",
        "a": "Social media makes staying in touch easier. People can send <strong>free messages and photos anytime</strong>. Calling friends in other countries is <strong>also very fast now</strong>."
      },
      {
        "q": "Do you prefer calling or texting?",
        "vi": "Bạn thích gọi điện hay nhắn tin hơn?",
        "a": "I usually prefer texting for daily chats. Texting is <strong>quiet, quick, and convenient</strong>. However, for urgent news, <strong>calling is faster and clearer</strong>."
      },
      {
        "q": "Why is meeting face to face still the best way to talk?",
        "vi": "Tại sao gặp mặt trực tiếp vẫn là cách nói chuyện tốt nhất?",
        "a": "Meeting in person is always the warmest way. Friends can <strong>see real smiles and body language</strong>. Spending time together helps <strong>build stronger trust and friendship</strong>."
      }
    ]
  },
  {
    "id": "q-topic-01",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 01",
    "title": "Equal partnership in a family has some features.",
    "center": "Equal partnership",
    "branches": [
      {
        "num": 1,
        "text": "Share some routines & household tasks",
        "pos": "top",
        "type": "verb",
        "vi": "Chia sẻ sinh hoạt & việc nhà"
      },
      {
        "num": 2,
        "text": "Childcare responsibility",
        "pos": "right",
        "type": "noun",
        "vi": "Trách nhiệm chăm sóc con cái"
      },
      {
        "num": 3,
        "text": "Work as a team",
        "pos": "bottom",
        "type": "verb",
        "vi": "Phối hợp như một đội"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How have the roles of husband and wife changed in the past 10 years?",
        "vi": "Vai trò của vợ và chồng đã thay đổi như thế nào trong 10 năm qua?",
        "a": "Their roles have changed a lot. In the past, men worked outside while <strong>women stayed at home</strong>. Today, both husband and wife <strong>go to work and share housework</strong>."
      },
      {
        "q": "What roles do grandparents play in a family?",
        "vi": "Ông bà đóng vai trò gì trong một gia đình?",
        "a": "Grandparents play a <strong>very important role in a family</strong>. They often help parents <strong>look after young children</strong>. They also <strong>teach grandchildren good family traditions</strong>."
      },
      {
        "q": "What do you think about single-parent families?",
        "vi": "Bạn nghĩ gì về các gia đình đơn thân?",
        "a": "I think single parents are very strong. They have to <strong>earn money and raise children alone</strong>. However, with family love, their children can <strong>still grow up happily</strong>."
      }
    ]
  },
  {
    "id": "q-topic-02",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 02",
    "title": "A good worker can adapt well to any working environment.",
    "center": "A good worker",
    "branches": [
      {
        "num": 1,
        "text": "Creativity",
        "pos": "top",
        "type": "noun",
        "vi": "Sự sáng tạo"
      },
      {
        "num": 2,
        "text": "Responsibility",
        "pos": "right",
        "type": "noun",
        "vi": "Tinh thần trách nhiệm"
      },
      {
        "num": 3,
        "text": "Have many skills",
        "pos": "bottom",
        "type": "verb",
        "vi": "Có nhiều kỹ năng đa dạng"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is it important for workers to adapt quickly today?",
        "vi": "Tại sao ngày nay việc nhân viên thích nghi nhanh lại quan trọng?",
        "a": "Because technology changes very fast today. When workers learn new tools quickly, they can <strong>do their jobs better</strong>. It also helps them <strong>keep their jobs more easily</strong>."
      },
      {
        "q": "Can someone improve their problem-solving skills?",
        "vi": "Một người có thể cải thiện kỹ năng giải quyết vấn đề không?",
        "a": "Yes, I think they can. People should <strong>stay calm and think step by step</strong>. They can also <strong>ask experienced coworkers for advice</strong>."
      },
      {
        "q": "Which is more important: job skills or a good work attitude?",
        "vi": "Kỹ năng làm việc hay thái độ làm việc tốt quan trọng hơn?",
        "a": "I think both are important, but <strong>a good attitude is more important</strong>. Companies can teach workers new skills easily. Workers with a good attitude are <strong>always ready to learn</strong>."
      }
    ]
  },
  {
    "id": "q-topic-03",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 03",
    "title": "A friend in need is a friend indeed.",
    "center": "A good friend",
    "branches": [
      {
        "num": 1,
        "text": "Give helpful advice",
        "pos": "top",
        "type": "verb",
        "vi": "Đưa ra lời khuyên hữu ích"
      },
      {
        "num": 2,
        "text": "Listen and keep your secrets",
        "pos": "right",
        "type": "verb",
        "vi": "Lắng nghe và giữ bí mật"
      },
      {
        "num": 3,
        "text": "Point out your mistakes",
        "pos": "bottom",
        "type": "verb",
        "vi": "Chỉ ra lỗi sai cho bạn"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "How can people keep close friendships when they live far apart?",
        "vi": "Mọi người làm thế nào để giữ tình bạn thân khi sống xa nhau?",
        "a": "It is quite easy today. Friends can <strong>text and make video calls every week</strong>. Visiting each other on holidays also <strong>keeps the friendship warm</strong>."
      },
      {
        "q": "Is having a few close friends better than having many casual friends?",
        "vi": "Có ít bạn thân có tốt hơn có nhiều bạn xã giao không?",
        "a": "Yes, I think it is better. Close friends <strong>truly care about you</strong>. When you have problems, they <strong>are ready to help you</strong>."
      },
      {
        "q": "What should you do if a friend breaks your trust?",
        "vi": "Bạn nên làm gì nếu một người bạn làm mất lòng tin của bạn?",
        "a": "People should <strong>stay calm and talk honestly with them</strong>. Explain clearly how you feel. If they say sorry, you can <strong>give them another chance</strong>."
      }
    ]
  },
  {
    "id": "q-topic-04",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 04",
    "title": "A good team leader has some clear qualities.",
    "center": "A team leader",
    "branches": [
      {
        "num": 1,
        "text": "Responsibility",
        "pos": "top",
        "type": "noun",
        "vi": "Tinh thần trách nhiệm"
      },
      {
        "num": 2,
        "text": "Good communication skills",
        "pos": "right",
        "type": "noun",
        "vi": "Kỹ năng giao tiếp tốt"
      },
      {
        "num": 3,
        "text": "Be supportive",
        "pos": "bottom",
        "type": "adj",
        "vi": "Luôn hỗ trợ và động viên"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Are good leaders born that way, or can people learn to be leaders?",
        "vi": "Người lãnh đạo giỏi là bẩm sinh hay có thể học để trở thành?",
        "a": "I think people can learn to be leaders. They can <strong>practice by leading small school clubs</strong>. With experience, they will <strong>manage others much better</strong>."
      },
      {
        "q": "How should a leader solve problems between team members?",
        "vi": "Người trưởng nhóm nên giải quyết mâu thuẫn giữa các thành viên như thế nào?",
        "a": "A leader should <strong>stay calm and listen to both sides</strong>. Then they can talk fairly together. This helps the team <strong>find a good answer quickly</strong>."
      },
      {
        "q": "What is the difference between a boss and a true leader?",
        "vi": "Sự khác biệt giữa một ông chủ và một người lãnh đạo thật sự là gì?",
        "a": "They are quite different. A boss mainly <strong>gives orders to workers</strong>. A true leader works with the team and <strong>helps everyone improve</strong>."
      }
    ]
  },
  {
    "id": "q-topic-05",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 05",
    "title": "A great teacher can inspire and support students in many ways.",
    "center": "A great teacher",
    "branches": [
      {
        "num": 1,
        "text": "Be creative",
        "pos": "top",
        "type": "adj",
        "vi": "Sáng tạo trong giảng dạy"
      },
      {
        "num": 2,
        "text": "Be knowledgeable",
        "pos": "right",
        "type": "adj",
        "vi": "Am hiểu kiến thức sâu rộng"
      },
      {
        "num": 3,
        "text": "Be patient",
        "pos": "bottom",
        "type": "adj",
        "vi": "Kiên nhẫn với học sinh"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Who was your favorite teacher and why?",
        "vi": "Giáo viên yêu thích nhất của bạn là ai và tại sao?",
        "a": "My favorite teacher was my high school English teacher. She was <strong>always friendly and very patient</strong>. Her clear lessons made me <strong>love learning English</strong>."
      },
      {
        "q": "Will computers ever replace human teachers?",
        "vi": "Máy tính có thể thay thế giáo viên thật không?",
        "a": "No, I don't think so. Computers are useful, but they <strong>have no real feelings</strong>. Only human teachers can <strong>care about and encourage students</strong>."
      },
      {
        "q": "What is the biggest problem for teachers today?",
        "vi": "Vấn đề lớn nhất đối với giáo viên hiện nay là gì?",
        "a": "Today, many students use phones too much. Therefore, it is <strong>hard to keep students focused in class</strong>. Teachers also have <strong>a lot of school work to prepare</strong>."
      }
    ]
  },
  {
    "id": "q-topic-06",
    "category": "qualities",
    "categoryName": "Nhóm Đặc Điểm / Phẩm Chất",
    "topicCode": "ĐỀ SỐ 06",
    "title": "A good student shows certain important qualities.",
    "center": "A good student",
    "branches": [
      {
        "num": 1,
        "text": "Self-discipline",
        "pos": "top",
        "type": "noun",
        "vi": "Tính kỷ luật tự giác"
      },
      {
        "num": 2,
        "text": "Eagerness to learn",
        "pos": "right",
        "type": "noun",
        "vi": "Sự ham học hỏi"
      },
      {
        "num": 3,
        "text": "Ability to manage time well",
        "pos": "bottom",
        "type": "noun",
        "vi": "Khả năng quản lý thời gian tốt"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Why is self-discipline so important for students today?",
        "vi": "Tại sao tính tự giác lại rất quan trọng đối với học sinh ngày nay?",
        "a": "Because students spend a lot of time online today. There are many <strong>fun videos and games on phones</strong>. Self-discipline helps students <strong>focus on their studies</strong>."
      },
      {
        "q": "Which is more important: high test scores or good character?",
        "vi": "Điểm kiểm tra cao hay nhân cách tốt quan trọng hơn?",
        "a": "I think both are important, but <strong>good character is more important</strong>. Being kind and honest helps people <strong>make good friends</strong>. It also helps them <strong>get respect from others</strong>."
      },
      {
        "q": "How can students improve their time management?",
        "vi": "Học sinh làm thế nào để cải thiện kỹ năng quản lý thời gian?",
        "a": "Students should <strong>write a simple daily to-do list</strong>. They should finish important homework first. Turning off phones also helps them <strong>study much faster</strong>."
      }
    ]
  },
  {
    "id": "f-topic-01",
    "category": "factors",
    "categoryName": "Nhóm Yếu Tố",
    "topicCode": "ĐỀ SỐ 01",
    "title": "There are several factors to consider when applying for a job.",
    "center": "Applying for a job",
    "branches": [
      {
        "num": 1,
        "text": "Salary and bonuses",
        "pos": "top",
        "type": "noun",
        "vi": "Mức lương và chế độ thưởng"
      },
      {
        "num": 2,
        "text": "Workplace location",
        "pos": "right",
        "type": "noun",
        "vi": "Địa điểm làm việc & khoảng cách"
      },
      {
        "num": 3,
        "text": "A friendly working environment",
        "pos": "bottom",
        "type": "noun",
        "vi": "Môi trường làm việc & đồng nghiệp"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Which factor do you think is the most important?",
        "vi": "Bạn nghĩ yếu tố nào là quan trọng nhất?",
        "a": "I think <strong>salary is the most important factor</strong>. A good salary helps people <strong>pay for their daily expenses and support their families</strong>. It can also help them <strong>have a more comfortable life</strong>."
      },
      {
        "q": "Do young people and older people look for the same thing in a job?",
        "vi": "Người trẻ và người lớn tuổi có tìm kiếm điều giống nhau trong công việc không?",
        "a": "No, I don't think so. Young people often want to <strong>learn new skills and gain experience</strong>. Older people may prefer <strong>stable jobs because they want more security</strong>."
      },
      {
        "q": "How can people find a job that is suitable for them?",
        "vi": "Mọi người làm thế nào để tìm được công việc phù hợp với mình?",
        "a": "People should think about their <strong>abilities, skills, experience, and interests</strong>. They can look for jobs that are <strong>suitable for these things</strong>. This can help them <strong>find a good job</strong>."
      }
    ]
  },
  {
    "id": "f-topic-02",
    "category": "factors",
    "categoryName": "Nhóm Yếu Tố",
    "topicCode": "ĐỀ SỐ 02",
    "title": "There are several factors to consider in order to make a good impression in an interview.",
    "center": "Impression in interview",
    "branches": [
      {
        "num": 1,
        "text": "Professional appearance and attire",
        "pos": "top",
        "type": "noun",
        "vi": "Trang phục và diện mạo chuyên nghiệp"
      },
      {
        "num": 2,
        "text": "Punctuality",
        "pos": "right",
        "type": "noun",
        "vi": "Đúng giờ"
      },
      {
        "num": 3,
        "text": "Clear and confident communication",
        "pos": "bottom",
        "type": "noun",
        "vi": "Giao tiếp rõ ràng và tự tin"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Which factor is the most important in a job interview?",
        "vi": "Yếu tố nào là quan trọng nhất trong một buổi phỏng vấn xin việc?",
        "a": "I think <strong>clear speaking is the most important factor</strong>. Good answers help the interviewer <strong>understand a candidate's skills</strong>. It can also show that <strong>they are ready for the job</strong>."
      },
      {
        "q": "Do you think first impressions are always right? Why or why not?",
        "vi": "Bạn có nghĩ ấn tượng ban đầu luôn đúng không? Tại sao có hoặc tại sao không?",
        "a": "No, I don't think so. Some good workers feel <strong>shy in the first few minutes</strong>. Interviewers need more time to <strong>see their real skills</strong>."
      },
      {
        "q": "What can people do if they make a bad first impression in an interview?",
        "vi": "Mọi người có thể làm gì nếu lỡ tạo ấn tượng xấu ban đầu trong buổi phỏng vấn?",
        "a": "They should <strong>stay calm and continue the interview confidently</strong>. They can give clear answers and <strong>show their skills</strong>. This may help <strong>change the interviewer's opinion</strong>."
      }
    ]
  },
  {
    "id": "f-topic-03",
    "category": "factors",
    "categoryName": "Nhóm Yếu Tố",
    "topicCode": "TOPIC 03",
    "title": "There are several factors to consider when choosing a university.",
    "center": "Choosing a university",
    "branches": [
      {
        "num": 1,
        "text": "Tuition fees",
        "pos": "top",
        "type": "noun",
        "vi": "Học phí và chi phí sinh hoạt"
      },
      {
        "num": 2,
        "text": "Academic reputation",
        "pos": "right",
        "type": "noun",
        "vi": "Danh tiếng học thuật và giảng viên"
      },
      {
        "num": 3,
        "text": "Career prospects",
        "pos": "bottom",
        "type": "noun",
        "vi": "Cơ hội việc làm sau khi ra trường"
      },
      {
        "num": 4,
        "text": "[Your own idea]",
        "pos": "left",
        "type": "free",
        "vi": "Ý kiến riêng của bạn"
      }
    ],
    "followups": [
      {
        "q": "Which factor do you think is the most important when choosing a university?",
        "vi": "Bạn nghĩ yếu tố nào là quan trọng nhất khi chọn trường đại học?",
        "a": "I think <strong>career prospects are the most important factor</strong>. Students go to university to <strong>learn good skills for work</strong>. A good school helps them <strong>find a good job later</strong>."
      },
      {
        "q": "Should high school students listen to their parents' advice when choosing a university?",
        "vi": "Học sinh cấp ba có nên nghe lời khuyên của bố mẹ khi chọn trường đại học không?",
        "a": "Yes, I think they should. Parents often have <strong>useful life experience to share</strong>. However, students should also <strong>choose a major they really like</strong>."
      },
      {
        "q": "Is studying at a famous university the only way to have a good job?",
        "vi": "Học tại một trường đại học nổi tiếng có phải là cách duy nhất để có việc làm tốt không?",
        "a": "No, I don't think so. Students from any school can <strong>work hard and learn practical skills</strong>. This can help them <strong>find a good job in the future</strong>."
      }
    ]
  }
];


// Linking Flashcards Pool
const FLASHCARDS_DATA = [
    { cat: 'Mở bài', front: 'There are some benefits of [topic].', back: 'Có một số lợi ích của... (Mở bài dạng Lợi ích)', ex: 'There are some benefits of teamwork in modern workplaces.' },
    { cat: 'Mở bài', front: 'There are some drawbacks of [topic].', back: 'Có một số nhược điểm/bất lợi của... (Mở bài dạng Bất lợi)', ex: 'There are some drawbacks of living in big cities.' },
    { cat: 'Mở bài', front: 'There are several causes of [topic].', back: 'Có một số nguyên nhân dẫn đến... (Mở bài dạng Nguyên nhân)', ex: 'There are several causes of youth violence.' },
    { cat: 'Mở bài', front: 'There are some reasons why [S+V]...', back: 'Có một số lý do tại sao... (Mở bài dạng Lý do)', ex: 'There are some reasons why women are encouraged to become leaders.' },
    { cat: 'Mở bài', front: 'There are some ways for [O] to [V]...', back: 'Có một số cách để [ai đó] [làm gì] (Mở bài dạng Cách thức)', ex: 'There are some ways for students to save money.' },
    { cat: 'Mở bài', front: 'There are several factors to consider when...', back: 'Có một số yếu tố cần cân nhắc khi... (Mở bài dạng Yếu tố)', ex: 'There are several factors to consider when applying for a job.' },
    { cat: 'Thân bài - Nhánh 1', front: 'One major advantage / factor is that...', back: 'Một ưu điểm / yếu tố lớn là...', ex: 'One major advantage is that online learning is flexible.' },
    { cat: 'Thân bài - Nhánh 2', front: 'Another advantage / reason is that...', back: 'Một ưu điểm / lý do khác là...', ex: 'Another advantage is that soft skills help people work better.' },
    { cat: 'Thân bài - Nhánh 3', front: 'One more good point / important factor is that...', back: 'Thêm một điểm tốt / yếu tố quan trọng nữa là...', ex: 'One more good point is that online learning is money-saving.' },
    { cat: 'Giải thích lý do', front: 'This is because...', back: 'Điều này là bởi vì...', ex: 'This is because students can study anytime and anywhere.' },
    { cat: 'Giải thích lý do', front: 'This means that...', back: 'Điều này có nghĩa là...', ex: 'This means that employees do not need to commute in traffic.' },
    { cat: 'Đưa ra ví dụ', front: 'For example, / For instance,', back: 'Ví dụ như, chẳng hạn như,', ex: 'For example, team members need to share their ideas.' },
    { cat: 'Đưa ra ví dụ', front: 'To be specific,', back: 'Cụ thể là,', ex: 'To be specific, they can handle many tasks at the same time.' },
    { cat: 'Nêu kết quả', front: 'Therefore, / As a result,', back: 'Vì vậy, do đó, kết quả là,', ex: 'Therefore, they can communicate more effectively.' },
    { cat: 'Nêu kết quả', front: 'This helps [O] to [V]...', back: 'Điều này giúp [ai đó] làm gì...', ex: 'This helps them save a lot of money on transport.' },
    { cat: 'Kết bài', front: 'In short, [Chủ đề] has several clear benefits.', back: 'Tóm lại, [Chủ đề] có một số lợi ích rõ ràng.', ex: 'In short, teamwork has several clear benefits, as mentioned above.' },
    { cat: 'Câu hỏi mở rộng', front: 'Now, I will answer some follow-up questions.', back: 'Bây giờ, tôi xin phép trả lời các câu hỏi mở rộng.', ex: 'Now, I will answer some follow-up questions: Number 1...' }
];

// App State
const state = {
    student: {
        name: '',
        classCode: '',
        isTeacher: false
    },
    theme: localStorage.getItem('vstep_sp3_theme') || 'light',
    audioEnabled: true,
    speechRate: 1.0,
    selectedVoiceURI: null,
    currentSimTopic: ALL_TOPICS_POOL[0],
    simTimer: {
        phase: 'ready',
        timeLeft: 60,
        totalTime: 60,
        interval: null,
        isPaused: false
    },
    audioRecorder: {
        mediaRecorder: null,
        audioChunks: [],
        audioBlob: null,
        audioUrl: null
    },
    cardIndex: 0
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initTheme();
    initVoices();
    initNavigation();
    initExamSimulator();
    initFlashcards();
    renderAllMindmaps();
});

// Danh sách học viên các lớp được cấp quyền truy cập
const CLASS_STUDENTS = {
    "CB206": [
        "Văn Như Anh", "Nguyễn Thị Vân Anh", "Nguyễn Thị Hồng Duyên", "Nguyễn Thị Thúy Hồng",
        "Trương Ngọc Nhi", "Nguyễn Phạm Như Quỳnh", "Trần Lê Quỳnh", "Thị Mỹ Tâm", "Ông Lê Thành",
        "Trần Nguyễn Thanh Thảo", "Phan Nhật Thiện", "Nguyễn Mỹ Tiên", "Trần Thị Cẩm Tiên",
        "Võ Trần Bảo Tính", "Trương Thanh Toàn", "Phạm Ngọc Trâm", "Nguyễn Võ Bảo Trân"
    ],
    "CB210": [
        "Nguyễn Võ Thành Đạt", "Lê Huỳnh Thanh Duy", "Nguyễn Cao Kỳ Duyên", "Đào Ngọc Hân", 
        "Trần Văn Hữu", "Trần Văn Kim Khoa", "Nguyễn Thanh Nâng", "Huỳnh Kỳ Nguyên", 
        "Võ Thị Kim Nguyên", "Võ Hùng Sanh", "Tiền Thị Thanh Thảo", "Trần Thị Thanh Thảo", "Đặng Thị Kim Thoa", 
        "Trần Thị Tiên Tiên", "Lê Kim Tuyền"
    ],
    "CB211": [
        "Hồ Anh Quân", "Lê Thành Nghiệp", "Lê Khánh Lâm", "Huỳnh Thị Ngọc Thắm", 
        "Mai Trần Xuân Mai", "Lê Thị Uyển Nhi", "Nguyễn Thụy Thanh Trúc"
    ],
    "CB213": [
        "Nguyễn Quốc Anh", "Hoàng Hợp Minh Châu", "Đặng Châu Gia Huy", "Trần Minh Tuệ Mẩn", 
        "Đặng Thị Trúc Măng", "Trương Thị Kha My", "Ngô Diễm My", "Chiêm Chúc Ngân", 
        "Huỳnh Thị Yến Nhi", "Phạm Nguyễn Tâm Như", "Phạm Nhựt Tiến", "Lê Thị Tú Trinh", 
        "Trần Ngọc Vinh"
    ],
    "ONB103": [
        "Nguyễn Thị Duy", "Phạm Trần Mỹ Hân", "Trịnh Thị Thu Hiền", "Nguyễn Hoàng Kha",
        "Phạm Thị Út Lua", "Lê Huỳnh Diễm My", "Nguyễn Thị Ngọc Mỹ", "Huỳnh Thị Kim Ngân",
        "Trần Thị Kim Ngân", "Nguyễn Thị Tiểu Phụng", "Trần Yến Phụng", "Phạm Ngọc Thạch",
        "Cao Thị Thu Trang", "Nguyễn Thị Thanh Tuyền", "Trần Phạm Phương Uyên", "Trần Ngô Mỹ Vy"
    ],
    "CB219": [
        "Lưu Thị Vân Anh", "Nguyễn Tuấn Anh", "Trần Thị Huỳnh Duy", "Duy Thị Quỳnh Hân",
        "Trần Thị Xuân Hoa", "Nguyễn Phạm Khang", "Đặng Văn Khánh", "Chim Nhật Luân",
        "Lư Vĩnh Phúc", "Nguyễn Chí Thiện", "Trần Thị Ngọc Thơ", "Huỳnh Yến Trang",
        "Thị Thu Trinh", "Nguyễn Thị Mỹ Xuyên", "Nguyễn Như Ý"
    ],
    "B212": [
        "Nguyễn Duy Hồng Anh", "Nguyễn Ngọc Minh Anh", "Nguyễn Lê Mỹ Hân", "Nguyễn Hồng Minh Huy",
        "Nguyễn Quốc Khải", "Đoàn Nguyễn Đình Khang", "Lê Nguyễn Gia Khánh", "Nguyễn Hữu Khánh", 
        "Hồ Thị Ngọc Lan", "Trần Thị Hồng Lỉnh", "Võ Thị Triệu Minh", "Hứa Đình Nghi", 
        "Võ Thị Bảo Ngọc", "Lê Tiến Phát", "Nguyễn Hoàng Thông", "Nguyễn Kim Tiền", 
        "Lê Thị Bảo Trân", "Võ Thị Diễm Trinh", "Nguyễn Tấn Trung", "Nguyễn Tiến Trung", 
        "Trần Thị Ánh Tuyết", "Đặng Nguyễn Khánh Uyên", "Nguyễn Thị Chúc Yến"
    ]
};

// Chuẩn hóa chuỗi so sánh họ tên
function normalizeStr(str) {
    return (str || '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[đĐ]/g, 'd')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

// Authentication & Access Control
function initAuth() {
    const modal = document.getElementById('welcome-modal');
    const startBtn = document.getElementById('start-btn');
    const nameInput = document.getElementById('student-name');
    const classInput = document.getElementById('student-class');
    const errorMsg = document.getElementById('login-error');
    const displayName = document.getElementById('display-name');
    const userProfile = document.getElementById('user-profile');
    const userRoleLabel = userProfile ? userProfile.querySelector('.info span') : null;
    const userAvatar = userProfile ? userProfile.querySelector('.avatar') : null;

    // Luôn luôn hiển thị modal đăng nhập mỗi khi tải lại trang / refresh
    state.student.name = '';
    state.student.classCode = '';
    state.student.isTeacher = false;
    
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
    }
    if (userProfile) {
        userProfile.classList.add('hidden');
    }
    if (nameInput) nameInput.value = '';
    if (classInput) classInput.value = '';
    if (errorMsg) errorMsg.style.display = 'none';

    // Cho phép nhấn vào profile để đăng xuất hoặc đổi tài khoản
    if (userProfile) {
        userProfile.style.cursor = 'pointer';
        userProfile.title = 'Nhấn để đổi tài khoản hoặc đăng xuất';
        userProfile.onclick = () => {
            if (confirm('Bạn có muốn đổi tài khoản hoặc đăng nhập lại không?')) {
                location.reload();
            }
        };
    }

    function handleLogin() {
        const nameVal = nameInput ? nameInput.value.trim() : '';
        const classVal = classInput ? classInput.value.trim() : '';

        if (!nameVal || !classVal) {
            if (errorMsg) {
                errorMsg.textContent = 'Vui lòng nhập đầy đủ Họ tên và Mã lớp!';
                errorMsg.style.display = 'block';
            }
            if (!nameVal && nameInput) nameInput.focus();
            else if (!classVal && classInput) classInput.focus();
            return;
        }

        let formattedClass = classVal.toUpperCase().replace(/\s+/g, '');
        // Tự động nhận diện CB21O tương đương CB210
        if (formattedClass === 'CB21O') {
            formattedClass = 'CB210';
        }

        const normName = normalizeStr(nameVal);

        // 1. Kiểm tra tài khoản Giáo viên (tên PTMN, mã lớp GV)
        const isTeacher = 
            (formattedClass === 'GV' || formattedClass === 'GV2026') ||
            normName === 'ptmn' ||
            normName.includes('ptmn') ||
            normName.includes('co nguyet') ||
            normName.includes('minh nguyet') ||
            normName.includes('pham thi minh nguyet');

        let finalName = '';
        let finalClass = '';

        if (isTeacher) {
            finalName = (normName === 'ptmn' || !nameVal) ? 'Cô Nguyệt (PTMN)' : nameVal;
            finalClass = formattedClass || 'GV';
            state.student.isTeacher = true;
        } else {
            // 2. Kiểm tra học viên thuộc 5 lớp: CB206, CB210, CB211, CB213, ONB103
            const allowedClasses = ['CB206', 'CB210', 'CB211', 'CB213', 'ONB103', 'CB219', 'B212'];
            if (!allowedClasses.includes(formattedClass)) {
                if (errorMsg) {
                    errorMsg.textContent = 'Mã lớp không hợp lệ! Web chỉ nhận các lớp CB206, CB210 (CB21O), CB211, CB213, ONB103 hoặc Giáo viên (PTMN / GV).';
                    errorMsg.style.display = 'block';
                }
                if (classInput) classInput.focus();
                return;
            }

            const roster = CLASS_STUDENTS[formattedClass];
            const matchedStudent = roster.find(s => normalizeStr(s) === normName);

            if (!matchedStudent) {
                if (errorMsg) {
                    errorMsg.textContent = `Họ và tên không thuộc danh sách lớp ${formattedClass}. Vui lòng kiểm tra lại chính tả!`;
                    errorMsg.style.display = 'block';
                }
                if (nameInput) nameInput.focus();
                return;
            }

            finalName = matchedStudent;
            finalClass = formattedClass;
            state.student.isTeacher = false;
        }

        if (errorMsg) errorMsg.style.display = 'none';

        state.student.name = finalName;
        state.student.classCode = finalClass;

        const logData = `${finalName} - Lớp: ${finalClass}`;
        const trackingUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdnmu4S5vco1TBcNBUGaeEAlbpan_w4aO9JMLIqbafBKABh4g/formResponse';

        try {
            const entry = document.getElementById('entry_388968236');
            const form = document.getElementById('google-form') || document.getElementById('tracking-form');
            if (entry && form) {
                entry.value = logData;
                form.submit();
            }
        } catch (e) {
            console.warn('Iframe attendance submit warning:', e);
        }

        try {
            const formData = new FormData();
            formData.append('entry.388968236', logData);
            fetch(trackingUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            }).catch(e => console.warn('Fetch tracking warning:', e));
        } catch (e) {
            console.warn('Fetch init warning:', e);
        }

        if (modal) modal.style.display = 'none';
        if (displayName) displayName.innerText = finalName + ' (' + finalClass + ')';
        if (userRoleLabel) userRoleLabel.innerText = state.student.isTeacher ? 'Giáo viên' : 'Học viên';
        if (userAvatar && state.student.isTeacher) {
            userAvatar.innerHTML = '<i class="fa-solid fa-chalkboard-user"></i>';
        }
        if (userProfile) userProfile.classList.remove('hidden');

        showToast(`Chào mừng ${finalName} - Lớp ${finalClass} đến với bài học Speaking Part 03! 🚀`);
        if (window.confetti) {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        }
    }

    if (startBtn) {
        startBtn.onclick = handleLogin;
    }

    // Hỗ trợ phím Enter để đăng nhập nhanh
    if (nameInput) {
        nameInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                if (classInput && !classInput.value.trim()) {
                    classInput.focus();
                } else {
                    handleLogin();
                }
            }
        };
    }
    if (classInput) {
        classInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                handleLogin();
            }
        };
    }
}

// Theme
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    if (state.theme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            state.theme = isDark ? 'dark' : 'light';
            localStorage.setItem('vstep_sp3_theme', state.theme);
            themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }
}

// Voices & Speech
function initVoices() {
    const voiceSelect = document.getElementById('voice-select');
    const speedSelect = document.getElementById('speed-select');

    function populateVoices() {
        if (!('speechSynthesis' in window)) return;
        const voices = window.speechSynthesis.getVoices();
        if (!voiceSelect) return;
        voiceSelect.innerHTML = '<option value="">🌿 Giọng tự nhiên...</option>';
        voices.filter(v => v.lang.startsWith('en')).forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.voiceURI;
            opt.textContent = v.name + ' (' + v.lang + ')';
            if (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David')) {
                opt.selected = true;
                state.selectedVoiceURI = v.voiceURI;
            }
            voiceSelect.appendChild(opt);
        });
    }

    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = populateVoices;
        populateVoices();
    }

    if (voiceSelect) {
        voiceSelect.addEventListener('change', (e) => {
            state.selectedVoiceURI = e.target.value;
        });
    }

    if (speedSelect) {
        speedSelect.addEventListener('change', (e) => {
            state.speechRate = parseFloat(e.target.value) || 1.0;
        });
    }
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const topTitle = document.getElementById('top-title');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    window.switchTab = function(targetId) {
        navItems.forEach(i => {
            if (i.getAttribute('data-target') === targetId) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });

        document.querySelectorAll('.tab-pane').forEach(p => {
            p.classList.remove('active');
            p.style.display = '';
        });
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
            targetPane.classList.add('active');
            targetPane.classList.remove('hidden');
            targetPane.style.display = '';
            if (targetId === 'flower-garden' && window.FlowerGarden) {
                window.FlowerGarden.render();
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const activeItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);
        if (activeItem && topTitle) {
            const titleText = activeItem.querySelector('span') ? activeItem.querySelector('span').innerText : targetId;
            topTitle.innerText = titleText;
        }

        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            if (backdrop) backdrop.classList.remove('open');
        }
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            if (!targetId) return;
            window.switchTab(targetId);
        });
    });

    if (mobileToggle && sidebar && backdrop) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
            backdrop.classList.add('open');
        });
        backdrop.addEventListener('click', () => {
            sidebar.classList.remove('open');
            backdrop.classList.remove('open');
        });
    }
}

// Subtab switcher
window.switchSubTab = function(btn, panelId) {
    const parentPane = btn.closest('.tab-pane') || document;
    parentPane.querySelectorAll('.cat-subtab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    parentPane.querySelectorAll('.sub-tab-panel').forEach(p => p.classList.remove('active'));
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) targetPanel.classList.add('active');
};

// Text-to-Speech
window.speakText = function(text, btn) {
    if (!('speechSynthesis' in window)) {
        alert('Trình duyệt của bạn không hỗ trợ tính năng đọc âm thanh!');
        return;
    }
    window.speechSynthesis.cancel();
    if (!text) return;

    // Automatically strip any HTML tags before speech synthesis
    const cleanSpeechText = text.replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.lang = 'en-US';
    utterance.rate = state.speechRate || 1.0;

    if (state.selectedVoiceURI) {
        const voices = window.speechSynthesis.getVoices();
        const found = voices.find(v => v.voiceURI === state.selectedVoiceURI);
        if (found) utterance.voice = found;
    }

    if (btn) {
        btn.classList.add('speaking');
        utterance.onend = () => btn.classList.remove('speaking');
        utterance.onerror = () => btn.classList.remove('speaking');
    }

    window.speechSynthesis.speak(utterance);
};

window.copyText = function(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        showToast('Đã sao chép vào bộ nhớ tạm!');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Đã sao chép vào bộ nhớ tạm!');
    });
};


window.showOverviewMindmapDetail = function(branchNum) {
    const detailBox = document.getElementById('overview-mm-detail');
    if (!detailBox) return;
    
    const details = {
        1: {
            title: 'Nhánh 1 (Top): Flexible (Tính từ)',
            en: 'One major benefit of online learning is that it is flexible.',
            vi: 'Một lợi ích lớn của việc học trực tuyến là nó rất linh hoạt (về thời gian và địa điểm học tập).',
            expand: 'Because students can study anywhere and at any time they want without traveling.'
        },
        2: {
            title: 'Nhánh 2 (Right): Convenient (Tính từ)',
            en: 'Another benefit is that it is convenient for everyone.',
            vi: 'Một lợi ích khác là việc học trực tuyến rất thuận tiện cho tất cả mọi người.',
            expand: 'Because they just need an internet-connected smartphone or laptop to join classes.'
        },
        3: {
            title: 'Nhánh 3 (Bottom): Money-saving (Tính từ)',
            en: 'One more benefit of online learning is that it is money-saving.',
            vi: 'Thêm một lợi ích nữa là học online giúp tiết kiệm tiền học tập và đi lại.',
            expand: 'In other words, students can save money on bus tickets, meals, and books.'
        },
        4: {
            title: 'Nhánh 4 (Left): [Your own idea] - Easy to review (Tự do)',
            en: 'In addition, students can review the lessons easily.',
            vi: 'Ngoài ra, học sinh có thể xem lại bài học một cách dễ dàng.',
            expand: 'For example, they can watch the lesson videos again whenever they do not understand a part.'
        }
    };
    
    const data = details[branchNum];
    if (!data) return;
    
    detailBox.innerHTML = `
        <div style="background: var(--bg-card); border-left: 4px solid var(--primary); padding: 1.25rem; border-radius: 12px; box-shadow: var(--shadow-sm); margin-top: 1.25rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem;">
                <strong style="color: var(--primary); font-size: 1.05rem;">${data.title}</strong>
                <button class="btn-pill-tts" onclick="speakText('${data.en} ${data.expand}')"><i class="fa-solid fa-volume-high"></i> Nghe</button>
            </div>
            <p style="font-size: 1.05rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.4rem;">${data.en}</p>
            <p style="font-size: 0.95rem; color: var(--text-light); margin-bottom: 0.6rem;">${data.vi}</p>
            <div style="font-size: 0.95rem; color: var(--primary-dark); background: rgba(79, 70, 229, 0.08); padding: 0.5rem 0.85rem; border-radius: 8px;">
                <strong>Câu mở rộng:</strong> ${data.expand}
            </div>
        </div>
    `;
    detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.toggleTranslation = function(targetId, btn) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const isHidden = el.style.display === 'none' || getComputedStyle(el).display === 'none';
    el.style.display = isHidden ? 'block' : 'none';
    if (btn) {
        if (isHidden) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Ẩn bản dịch tiếng Việt';
            // Smoothly scroll translation drawer into view if needed
            setTimeout(() => {
                const rect = el.getBoundingClientRect();
                if (rect.bottom > window.innerHeight) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 80);
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="fa-solid fa-language"></i> Xem bản dịch tiếng Việt';
        }
    }
};

// Interactive Mindmaps
function renderAllMindmaps() {
    document.querySelectorAll('.mindmap-branch-card').forEach(card => {
        card.addEventListener('click', () => {
            const exp = card.querySelector('.branch-expand-content');
            if (exp) {
                const isOpen = exp.style.display === 'block';
                exp.style.display = isOpen ? 'none' : 'block';
                card.classList.toggle('active', !isOpen);
            }
        });
    });
}

// Exam Simulator & Recorder
function initExamSimulator() {
    const topicSelect = document.getElementById('sim-topic-select');
    const randomBtn = document.getElementById('sim-random-btn');
    const startBtn = document.getElementById('sim-start-btn');
    const pauseBtn = document.getElementById('sim-pause-btn');
    const resetBtn = document.getElementById('sim-reset-btn');
    const timeDisplay = document.getElementById('sim-time-display');
    const phasePill = document.getElementById('sim-phase-pill');
    const circleProg = document.getElementById('sim-circle-progress');
    const promptContainer = document.getElementById('sim-prompt-display');
    const recStatus = document.getElementById('sim-rec-status');
    const playerAudio = document.getElementById('sim-audio-player');
    const downloadAudioBtn = document.getElementById('sim-download-audio-btn');

    if (topicSelect) {
        topicSelect.innerHTML = '';
        ALL_TOPICS_POOL.forEach((t, i) => {
            const opt = document.createElement('option');
            opt.value = t.id;
            opt.textContent = '[' + t.categoryName + ' - ' + (t.topicCode || '') + '] ' + t.title;
            topicSelect.appendChild(opt);
        });

        topicSelect.addEventListener('change', () => {
            const found = ALL_TOPICS_POOL.find(t => t.id === topicSelect.value);
            if (found) loadSimTopic(found);
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            const randIdx = Math.floor(Math.random() * ALL_TOPICS_POOL.length);
            const randTopic = ALL_TOPICS_POOL[randIdx];
            if (topicSelect) topicSelect.value = randTopic.id;
            loadSimTopic(randTopic);
            showToast('Đã chọn ngẫu nhiên chủ đề mới!');
        });
    }

    function loadSimTopic(topic) {
        state.currentSimTopic = topic;
        if (!promptContainer) return;

        const centerTitle = topic.center || topic.central || topic.title || '';
        const branches = topic.branches || [];
        const b1 = branches[0] || { text: '', vi: '', type: 'verb' };
        const b2 = branches[1] || { text: '', vi: '', type: 'verb' };
        const b3 = branches[2] || { text: '', vi: '', type: 'verb' };

        const tagMap = {
            'verb': 'Động từ',
            'adj': 'Tính từ',
            'noun': 'Danh từ',
            'clause': 'Mệnh đề',
            'free': 'Tự do'
        };

        const b1Tag = tagMap[b1.type] || 'Ý chính';
        const b2Tag = tagMap[b2.type] || 'Ý chính';
        const b3Tag = tagMap[b3.type] || 'Ý chính';

        const fuCards = (topic.followups || []).map((f, idx) => {
            const qClean = (f.q || '').replace(/'/g, "\\'");
            return `
                <div class="followup-card" style="background:var(--bg-subtle, #f8fafc); border:1px solid var(--border); border-radius:8px; padding:0.85rem 1rem; margin-bottom:0.75rem;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
                        <div style="flex:1;">
                            <div style="font-weight:700; font-size:0.95rem; color:var(--text-main); line-height:1.5;">
                                <span style="background:var(--primary); color:#ffffff; font-size:0.75rem; font-weight:700; padding:0.15rem 0.5rem; border-radius:4px; margin-right:0.4rem;">CÂU ${idx + 1}</span>
                                ${f.q}
                            </div>
                            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">↳ Dịch: ${f.vi || f.qVi || ''}</div>
                        </div>
                        <button class="practice-act-btn" onclick="speakText('${qClean}', this)" style="padding:0.25rem 0.65rem; font-size:0.8rem; flex-shrink:0;">
                            <i class="fa-solid fa-volume-high"></i> Nghe câu hỏi
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        promptContainer.innerHTML = `
            <div style="background: var(--bg-subtle); border: 1.5px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem 1.5rem; margin-bottom: 1.25rem;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">${topic.categoryName || ''}</span>
                <h3 style="font-size: 1.25rem; margin: 0.35rem 0 0.5rem; color: var(--text-main);">${topic.title || ''}</h3>
                ${topic.titleVi ? `<div style="font-size: 0.92rem; color: var(--text-muted); font-style: italic;">${topic.titleVi}</div>` : ''}
            </div>

            <!-- Mindmap Box Chuẩn VSTEP 4 Hướng -->
            <div class="mindmap-vstep-container" style="background:var(--bg-card); border:1.5px solid var(--border); border-radius:12px; box-shadow:none; padding:1.25rem 0.85rem; margin:0.85rem 0;">
                <div class="mindmap-cross-grid">
                    <div class="grid-top">
                        <div class="mm-node-card">
                            <div class="mm-node-badge">1</div>
                            <div class="mm-node-title">${b1.text || ''}</div>
                            <div class="mm-node-vi">${b1.vi || ''}</div>
                            <span class="mm-node-type-tag tag-${b1.type || 'verb'}">${b1Tag}</span>
                        </div>
                    </div>
                    <div class="grid-left">
                        <div class="mm-node-card" style="border-style:dashed; border-color:var(--amber);">
                            <div class="mm-node-badge" style="background:var(--amber);">4</div>
                            <div class="mm-node-title">[Your own idea]</div>
                            <div class="mm-node-vi">Ý kiến riêng của bạn</div>
                            <span class="mm-node-type-tag tag-free">Tự do</span>
                        </div>
                    </div>
                    <div class="grid-center">
                        <div class="mm-hub-box">
                            <span class="mm-hub-label">Chủ đề</span>
                            ${centerTitle}
                        </div>
                    </div>
                    <div class="grid-right">
                        <div class="mm-node-card">
                            <div class="mm-node-badge">2</div>
                            <div class="mm-node-title">${b2.text || ''}</div>
                            <div class="mm-node-vi">${b2.vi || ''}</div>
                            <span class="mm-node-type-tag tag-${b2.type || 'verb'}">${b2Tag}</span>
                        </div>
                    </div>
                    <div class="grid-bottom">
                        <div class="mm-node-card">
                            <div class="mm-node-badge">3</div>
                            <div class="mm-node-title">${b3.text || ''}</div>
                            <div class="mm-node-vi">${b3.vi || ''}</div>
                            <span class="mm-node-type-tag tag-${b3.type || 'verb'}">${b3Tag}</span>
                        </div>
                    </div>
                </div>

                <!-- Câu hỏi mở rộng đi cùng sơ đồ tư duy (KHÔNG CÓ ĐÁP ÁN SẴN) -->
                <div class="mindmap-followups-section" style="margin-top:2rem; border-top:1.5px dashed var(--border); padding-top:1.25rem;">
                    <div class="mindmap-followups-header" style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
                        <i class="fa-solid fa-comments" style="color:var(--primary);"></i>
                        <span>CÂU HỎI MỞ RỘNG (FOLLOW-UP QUESTIONS):</span>
                    </div>
                    <div class="mindmap-fu-list">
                        ${fuCards}
                    </div>
                </div>
            </div>
        `;
    }

    if (ALL_TOPICS_POOL.length > 0) loadSimTopic(ALL_TOPICS_POOL[0]);

    // Timer Controls
    const CIRCUMFERENCE = 565;
    function updateTimerUI() {
        const mins = Math.floor(state.simTimer.timeLeft / 60);
        const secs = state.simTimer.timeLeft % 60;
        if (timeDisplay) timeDisplay.innerText = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

        if (circleProg) {
            const offset = CIRCUMFERENCE - (state.simTimer.timeLeft / state.simTimer.totalTime) * CIRCUMFERENCE;
            circleProg.style.strokeDashoffset = offset;
        }
    }

    function playBeep(freq = 600, duration = 300) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            osc.start();
            osc.stop(ctx.currentTime + duration / 1000);
        } catch (e) {}
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (state.simTimer.phase === 'ready' || state.simTimer.phase === 'done') {
                state.simTimer.phase = 'prep';
                state.simTimer.timeLeft = 60;
                state.simTimer.totalTime = 60;
                if (phasePill) {
                    phasePill.className = 'phase-pill prep';
                    phasePill.innerText = 'Chuẩn bị (1 phút)';
                }
                if (circleProg) circleProg.style.stroke = 'var(--amber)';
                playBeep(440, 400);
                startInterval();
                startBtn.innerHTML = '<i class="fa-solid fa-forward-step"></i> Bỏ qua chuẩn bị';
            } else if (state.simTimer.phase === 'prep') {
                switchToSpeaking();
            }
        });
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            if (!state.simTimer.interval) return;
            state.simTimer.isPaused = !state.simTimer.isPaused;
            pauseBtn.innerHTML = state.simTimer.isPaused ? '<i class="fa-solid fa-play"></i> Tiếp tục' : '<i class="fa-solid fa-pause"></i> Tạm dừng';
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            clearInterval(state.simTimer.interval);
            state.simTimer.interval = null;
            state.simTimer.phase = 'ready';
            state.simTimer.timeLeft = 60;
            state.simTimer.totalTime = 60;
            state.simTimer.isPaused = false;
            if (phasePill) {
                phasePill.className = 'phase-pill ready';
                phasePill.innerText = 'Sẵn sàng';
            }
            if (circleProg) {
                circleProg.style.stroke = 'var(--primary)';
                circleProg.style.strokeDashoffset = 0;
            }
            if (startBtn) startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Bắt đầu làm bài';
            if (pauseBtn) pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Tạm dừng';
            stopRecording();
            updateTimerUI();
        });
    }

    function startInterval() {
        if (state.simTimer.interval) clearInterval(state.simTimer.interval);
        state.simTimer.interval = setInterval(() => {
            if (state.simTimer.isPaused) return;

            if (state.simTimer.timeLeft > 0) {
                state.simTimer.timeLeft--;
                updateTimerUI();
            } else {
                if (state.simTimer.phase === 'prep') {
                    switchToSpeaking();
                } else if (state.simTimer.phase === 'speaking') {
                    finishExam();
                }
            }
        }, 1000);
    }

    function switchToSpeaking() {
        state.simTimer.phase = 'speaking';
        state.simTimer.timeLeft = 240;
        state.simTimer.totalTime = 240;
        if (phasePill) {
            phasePill.className = 'phase-pill speaking';
            phasePill.innerText = 'Đang trình bày (4 phút)';
        }
        if (circleProg) circleProg.style.stroke = 'var(--emerald)';
        playBeep(880, 800);
        showToast('Hết giờ chuẩn bị! Bắt đầu 4 phút nói.');
        startRecording();
        if (startBtn) startBtn.innerHTML = '<i class="fa-solid fa-check"></i> Nộp bài sớm';
    }

    function finishExam() {
        clearInterval(state.simTimer.interval);
        state.simTimer.interval = null;
        state.simTimer.phase = 'done';
        if (phasePill) {
            phasePill.className = 'phase-pill done';
            phasePill.innerText = 'Hoàn thành';
        }
        if (circleProg) circleProg.style.stroke = 'var(--rose)';
        playBeep(523, 1000);
        stopRecording();
        showToast('Đã hết giờ làm bài!');
        if (window.confetti) {
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
    }

    // Audio Recorder
    function startRecording() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            if (recStatus) recStatus.innerText = 'Trình duyệt không hỗ trợ micro thu âm.';
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            state.audioRecorder.mediaRecorder = new MediaRecorder(stream);
            state.audioRecorder.audioChunks = [];

            state.audioRecorder.mediaRecorder.ondataavailable = e => {
                if (e.data.size > 0) state.audioRecorder.audioChunks.push(e.data);
            };

            state.audioRecorder.mediaRecorder.onstop = () => {
                state.audioRecorder.audioBlob = new Blob(state.audioRecorder.audioChunks, { type: 'audio/webm' });
                state.audioRecorder.audioUrl = URL.createObjectURL(state.audioRecorder.audioBlob);
                if (playerAudio) {
                    playerAudio.src = state.audioRecorder.audioUrl;
                    playerAudio.style.display = 'block';
                }
                if (downloadAudioBtn) {
                    downloadAudioBtn.style.display = 'inline-flex';
                    downloadAudioBtn.onclick = () => {
                        const a = document.createElement('a');
                        a.href = state.audioRecorder.audioUrl;
                        a.download = 'SpeakingPart3_' + (state.student.name || 'Student') + '.webm';
                        a.click();
                    };
                }
                if (recStatus) recStatus.innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--emerald);"></i> Đã lưu file ghi âm bài nói!';
            };

            state.audioRecorder.mediaRecorder.start();
            if (recStatus) recStatus.innerHTML = '<div class="recording-dot"></div> Đang ghi âm bài nói qua Micro...';
        }).catch(err => {
            console.error('Mic access error:', err);
            if (recStatus) recStatus.innerText = 'Không thể kết nối Micro (Vui lòng cấp quyền)';
        });
    }

    function stopRecording() {
        if (state.audioRecorder.mediaRecorder && state.audioRecorder.mediaRecorder.state === 'recording') {
            state.audioRecorder.mediaRecorder.stop();
        }
    }
}

// Flashcards
function initFlashcards() {
    const cardEl = document.getElementById('flashcard-box');
    const prevBtn = document.getElementById('card-prev-btn');
    const nextBtn = document.getElementById('card-next-btn');
    const shuffleBtn = document.getElementById('card-shuffle-btn');
    const speakBtn = document.getElementById('card-speak-btn');
    const counterEl = document.getElementById('card-counter');

    const catBadge = document.getElementById('card-cat-badge');
    const frontText = document.getElementById('card-front-text');
    const backText = document.getElementById('card-back-text');
    const backEx = document.getElementById('card-back-example');

    function updateCard() {
        if (FLASHCARDS_DATA.length === 0) return;
        const cur = FLASHCARDS_DATA[state.cardIndex];
        if (cardEl) cardEl.classList.remove('flipped');
        if (catBadge) catBadge.innerText = cur.cat;
        if (frontText) frontText.innerText = cur.front;
        if (backText) backText.innerText = cur.back;
        if (backEx) backEx.innerText = 'Ví dụ: ' + cur.ex;
        if (counterEl) counterEl.innerText = (state.cardIndex + 1) + ' / ' + FLASHCARDS_DATA.length;
    }

    if (cardEl) {
        cardEl.addEventListener('click', () => cardEl.classList.toggle('flipped'));
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            state.cardIndex = (state.cardIndex - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length;
            updateCard();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            state.cardIndex = (state.cardIndex + 1) % FLASHCARDS_DATA.length;
            updateCard();
        });
    }

    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
            for (let i = FLASHCARDS_DATA.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [FLASHCARDS_DATA[i], FLASHCARDS_DATA[j]] = [FLASHCARDS_DATA[j], FLASHCARDS_DATA[i]];
            }
            state.cardIndex = 0;
            updateCard();
            showToast('Đã xáo trộn danh sách thẻ!');
        });
    }

    if (speakBtn) {
        speakBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cur = FLASHCARDS_DATA[state.cardIndex];
            speakText(cur.front);
        });
    }

    updateCard();
}

// Toast
function showToast(msg) {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> ' + msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
}
