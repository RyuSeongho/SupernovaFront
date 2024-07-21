import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userIDState } from '../atom/atom';
import styled from 'styled-components';
import LinkInputModal from '../components/TimeTable/LinkInput';
import PetSelect from '../components/pet/PetSelect';
import Navbar from '../components/navigation/Navbar';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: space-between;
    background-color: #fff;
    position: relative; /* 추가 */
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    position: relative;
`;

const ToggleButton = styled.button`
    width: 30px;
    height: 30px;
    background: url('/img/toggle.svg') no-repeat center center;
    background-size: cover;
    border: none;
    cursor: pointer;
`;

const SemesterInfo = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 17px;
    font-weight: 500;
    color: #000;
    position: absolute;
    right: 20px;
    flex-direction: row;
`;

const Content = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 20px;
`;

const Info = styled.div`
    width: 100%;
    padding: 0 20px;
    text-align: left;
    margin-left: 80px;
`;

const InfoText1 = styled.p`
    color: #000;
    font-size: 17px;
    text-align: left;
    margin-bottom: 4px;
`;

const InfoText2 = styled.p`
    font-size: 24px;
    text-align: left;
    font-weight: bold;
    margin-top: 4px;
    margin-bottom: 14px;
`;

const InfoText3 = styled.p`
    color: #555555;
    font-size: 13px;
    text-align: left;
    margin-top: 14px;
`;

const HighlightedText = styled.span`
    color: #F27200;
    font-weight: bold;
    font-size: 28px;
`;

const Placeholder = styled.div`
    width: 150px;
    height: 150px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 10px;
`;

const PlaceholderText = styled.p`
    color: #b0b0b0;
`;

const Footer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    background-color: #ffe680;
`;

const ProgressBarContainer = styled.div`
    width: 150px;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin: 5px 0 0 0;
`;

const ProgressBarFill = styled.div`
    height: 100%;
    width: ${(props) => props.width}%;
    background-color: #F27200;
    transition: width 0.5s ease-in-out;
`;

const ProgressBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const LevelText = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: #555555;
    margin-right: 120px;
    
`;

const ProgressBar = ({ progress }) => (
    <ProgressBarWrapper>
        <LevelText>Lv. {Math.floor(progress / 10)}</LevelText>
        <ProgressBarContainer>
            <ProgressBarFill width={progress} />
        </ProgressBarContainer>
    </ProgressBarWrapper>
);

function Main() {
    const [userID, setUserID] = useRecoilState(userIDState);
    const navigate = useNavigate();
    const [isLinkInputModalOpen, setIsLinkInputModalOpen] = useState(false);
    const [isPetSelectOpen, setIsPetSelectOpen] = useState(false);
    const [progress, setProgress] = useState(40); // 초기 진행 상황 값을 설정
    const [selectedPet, setSelectedPet] = useState(null);

    const handleSuccess = (selectedPetIndex) => {
        setSelectedPet(selectedPetIndex);
        setIsPetSelectOpen(false);
        setIsLinkInputModalOpen(true);
    };

    const openPetSelect = () => {
        setIsLinkInputModalOpen(false);
        setIsPetSelectOpen(true);
    };

    return (
        <AppContainer>
            <Header>
                <ToggleButton onClick={() => setIsLinkInputModalOpen(true)} />
                <SemesterInfo>
                    <div>0000학년도</div>
                    <div>0학기</div>
                </SemesterInfo>
            </Header>

            <Content>
                <Info>
                    <InfoText1>
                        이번 주 공강 N시간 중
                    </InfoText1>
                    <InfoText2>
                        <HighlightedText>N시간</HighlightedText> 을 활용했어요
                    </InfoText2>
                    <InfoText3>
                        지난 주 대비 N%
                    </InfoText3>
                </Info>
                <ProgressBar progress={progress} />
                <Placeholder>
                    <PlaceholderText>펫 보이는 곳..</PlaceholderText>
                </Placeholder>
            </Content>

            <Footer>
                <Navbar />
            </Footer>

            <LinkInputModal
                open={isLinkInputModalOpen}
                selectedPet={selectedPet}
                onClose={() => setIsLinkInputModalOpen(false)}
                onOpenPetSelect={openPetSelect} // openPetSelect 콜백 추가
            />

            <PetSelect
                open={isPetSelectOpen}
                onClose={() => setIsPetSelectOpen(false)}
                onSuccess={handleSuccess}
            />
        </AppContainer>
    );
}

export default Main;
